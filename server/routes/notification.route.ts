import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getNotifications, updateNotification } from "../controllers/notification.controller";
import { updateAccessToken } from "../controllers/userController";

const notificationRouter = express.Router();


notificationRouter.get("/get-all-notifciations",updateAccessToken, isAutheticated, authorizeRoles("admin"), getNotifications);

notificationRouter.put("/update-notifciations/:id",updateAccessToken, isAutheticated, authorizeRoles("admin"), updateNotification);


export default notificationRouter;