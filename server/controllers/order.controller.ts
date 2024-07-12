import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import { IOrder } from "../models/orderModel";
import CourseModel from "../models/course.model";
import NotificationModel from "../models/notificationModel";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";
import { newOrder } from "../services/order.service";

//create order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;
      console.log("Request Body:", req.body);

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(new ErrorHandler("Course ALready bought!", 400));
      }

      const course = await CourseModel.findById(courseId);

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

      await user?.save();

      const notification = await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You Have a new order from ${course?.name}`,
      });

      // need fix
      course.purchased ? course.purchased += 1 : course.purchased;

      console.log(course.purchased?.toString(), 500);
      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      console.log("ERROROROROR", 500);
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
