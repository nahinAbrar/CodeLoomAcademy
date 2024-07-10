require('dotenv').config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt from "jsonwebtoken";
import { redis } from "../utils/redis";

// user authentication
export const isAutheticated = CatchAsyncError(async(req:Request, res:Response, next:NextFunction) => {
    const access_token = req.cookies.access_token;

    if(!access_token){
        return next(new ErrorHandler("Please Login to access this resource",400));
    }

    const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN as string);

    if(!decoded){
        return next(new ErrorHandler("Access Token is not valid",400));
    }

    const user = await redis.get(decoded.id);

    if(!user) {
        return next(new ErrorHandler("User not found.",400));
    }

    req.user = JSON.parse(user);

    next();



})