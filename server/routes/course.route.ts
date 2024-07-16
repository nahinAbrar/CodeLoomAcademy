import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourse,
  getAllCoursesAdmin,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { updateAccessToken } from "../controllers/userController";

const courseRouter = express.Router();

courseRouter.post(
  "/create-course",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get("/get-course/:id", getSingleCourse);

courseRouter.get("/get-courses", getAllCourse);

courseRouter.get("/get-course-content/:id",updateAccessToken, isAutheticated, getCourseByUser);

courseRouter.put("/add-question",updateAccessToken, isAutheticated, addQuestion);

courseRouter.put("/add-answer",updateAccessToken, isAutheticated, addAnswer);

courseRouter.put("/add-review/:id",updateAccessToken, isAutheticated, addReview);

courseRouter.put(
  "/add-reply",
  isAutheticated,
  authorizeRoles("admin"),
  addReplyToReview
);

courseRouter.post(
  "/getVdoCipherOTP",
  generateVideoUrl
);

courseRouter.get(
  "/get-courses-admin",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  getAllCoursesAdmin
);

courseRouter.delete(
  "/delete-course/:id",
  updateAccessToken,
  isAutheticated,
  authorizeRoles("admin"),
  deleteCourse
);

export default courseRouter;
