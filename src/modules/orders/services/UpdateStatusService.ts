import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IRequest {
  order_id: string;
  status: string;
}

class UpdateStatusService {
  public async execute({ order_id, status }: IRequest): Promise<void> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const order = await ordersRepository.findById(order_id);

    if (!order) {
      throw new AppError("Order not found.");
    }

    order.status = status;

    await ordersRepository.save(order);
  }
}

export default UpdateStatusService;
