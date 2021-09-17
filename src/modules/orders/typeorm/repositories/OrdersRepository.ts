import { EntityRepository, Repository } from "typeorm";
import User from "@modules/users/typeorm/entities/User";
import Order from "../entities/Order";

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  user: User;
  products: IProduct[];
  total: number;
}

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ["order_products", "user", "user.address"],
    });

    return order;
  }

  public async createOrder({ user, products, total }: IRequest): Promise<Order> {
    const order = this.create({
      user,
      order_products: products,
      total
    });

    await this.save(order);

    return order;
  }
}

export default OrdersRepository;
