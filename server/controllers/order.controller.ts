require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import { IOrder } from "../models/orderModel";
import CourseModel, { ICourse } from "../models/course.model";
import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { getAllOrderService, newOrder } from "../services/order.service";
import { redis } from "../utils/redis";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if (payment_info) {
        if ("id" in payment_info) {
          const paymentIntentId = payment_info.id;
          const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId
          );

          if (paymentIntent.status !== "succeeded") {
            return next(new ErrorHandler("Payment not authorized", 400));
          }
        }
      }

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(new ErrorHandler("Course ALready bought!", 400));
      }

      const course:any = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course Not Found", 400));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      try {
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          data: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course?._id);

      await redis.set(req.user?._id, JSON.stringify(user));

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You Have a new order from ${course?.name}`,
      });

      // maybe fixed
      course.purchased += 1

      console.log(course.purchased?.toString(), 500);
      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      console.log("ERROROROROR", 500);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all order for admin
export const getAllOrdersAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrderService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// send stripe publishable key
export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

// new payment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          company: "Educatum",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
