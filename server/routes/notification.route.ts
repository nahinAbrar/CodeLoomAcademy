import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { getNotifications, updateNotification } from "../controllers/notification.controller";

const notificationRouter = express.Router();


notificationRouter.get("/get-all-notifciations", isAutheticated, authorizeRoles("admin"), getNotifications);

notificationRouter.put("/update-notifciations/:id", isAutheticated, authorizeRoles("admin"), updateNotification);


export default notificationRouter;