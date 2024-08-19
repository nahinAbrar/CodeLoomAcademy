import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createOrder, getAllOrdersAdmin } from "../controllers/order.controller";
import { updateAccessToken } from "../controllers/user.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);

orderRouter.get("/get-order", isAutheticated, authorizeRoles("admin"), getAllOrdersAdmin);

export default orderRouter;