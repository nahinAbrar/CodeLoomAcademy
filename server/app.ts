require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleWare } from "./middleware/error";
import userRouter from "./routes/userRoute";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";

export const app = express();

// body parser
app.use(express.json({ limit: "50mb" }));

// cookie parser
app.use(cookieParser());

// cors => cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

// routes
app.use("/api/v1", userRouter, courseRouter, orderRouter, notificationRouter, analyticsRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    succsess: true,
    message: "API is working",
  });
});

// unknown root
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleWare);
