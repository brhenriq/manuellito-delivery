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

ordersRouter.get("/user/:user_id", ordersController.listForUser);

ordersRouter.post(
  "/",
  isAuthenticated,
  ordersController.create
);

ordersRouter.patch("/status/:order_id", ordersController.updateOrderStatus);

export default ordersRouter;
