import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import { generateLast12MonthsData } from "../utils/analytics.generator";
import userModel from "../models/userModel";
import CourseModel from "../models/course.model";
import OrderModel from "../models/orderModel";

// user data analytics
export const getUserAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await generateLast12MonthsData(userModel);

    res.status(200).json({
      success: true,
      users,
    });

    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// user course analytics
export const getCourseAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const courses = await generateLast12MonthsData(CourseModel);
  
      res.status(200).json({
        success: true,
        courses,
      });
  
      try {
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );

  // order analytics
export const getOrderAnalytics = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      const orders = await generateLast12MonthsData(OrderModel);
  
      res.status(200).json({
        success: true,
        orders,
      });
  
      try {
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );
