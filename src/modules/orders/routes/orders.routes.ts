import isAuthenticated from "@shared/http/middlewares/isAuthenticated";
import { Router } from "express";
import OrdersController from "../controllers/OrdersController";

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.get("/", ordersController.index);
ordersRouter.get(
  "/:id",
  ordersController.show
);

ordersRouter.post(
  "/",
  isAuthenticated,
  ordersController.create
);

export default ordersRouter;
