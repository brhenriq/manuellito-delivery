import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";

interface IRequest {
  user_id: string;
}

class ListOrdersForUserService {
  public async execute({ user_id }: IRequest): Promise<Order[]> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const orders = await ordersRepository.find({
      relations: ["order_products", "user"],
      where: {
        user: user_id
      }
    });

    return orders;
  }
}

export default ListOrdersForUserService;
