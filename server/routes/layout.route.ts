import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createLayout, editLayout, getLayoutByType } from "../controllers/layout.controller";
import { updateAccessToken } from "../controllers/userController";

const layoutRouter = express.Router();

layoutRouter.post("/create-layout", isAutheticated, authorizeRoles("admin"), createLayout);

layoutRouter.put("/edit-layout", isAutheticated, authorizeRoles("admin"), editLayout);

layoutRouter.get("/get-layout", getLayoutByType);


export default layoutRouter;