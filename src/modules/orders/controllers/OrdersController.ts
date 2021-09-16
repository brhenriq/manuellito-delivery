import { Request, Response } from "express";
import CreateOrderService from "../services/CreateOrderService";
import ListOrdersForUserService from "../services/ListOrdersForUserService";
import ListOrderService from "../services/ListOrdersService";
import ShowOrderService from "../services/ShowOrderService";

export default class OrdersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listOrders = new ListOrderService();

    const orders = await listOrders.execute();

    return response.json(orders);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ user_id, products });

    return response.json(order);
  }

  public async listForUser(request: Request, response: Response): Promise<Response> {
    const listOrders = new ListOrdersForUserService();
    const { user_id } = request.params;

    const orders = await listOrders.execute({ user_id });

    return response.json(orders);
  }
}
