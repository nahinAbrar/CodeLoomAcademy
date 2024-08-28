"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderAnalytics = exports.getCourseAnalytics = exports.getUserAnalytics = void 0;
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const analytics_generator_1 = require("../utils/analytics.generator");
const userModel_1 = __importDefault(require("../models/userModel"));
const course_model_1 = __importDefault(require("../models/course.model"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
// user data analytics
exports.getUserAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const users = await (0, analytics_generator_1.generateLast12MonthsData)(userModel_1.default);
    res.status(200).json({
        success: true,
        users,
    });
    try {
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// user course analytics
exports.getCourseAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const courses = await (0, analytics_generator_1.generateLast12MonthsData)(course_model_1.default);
    res.status(200).json({
        success: true,
        courses,
    });
    try {
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
// order analytics
exports.getOrderAnalytics = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    const orders = await (0, analytics_generator_1.generateLast12MonthsData)(orderModel_1.default);
    res.status(200).json({
        success: true,
        orders,
    });
    try {
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
