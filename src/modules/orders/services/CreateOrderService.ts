import { getCustomRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Order from "../typeorm/entities/Order";
import ProductRepository from "@modules/products/typeorm/repositories/ProductsRepository";
import OrdersRepository from "../typeorm/repositories/OrdersRepository";
import UsersRepository from "@modules/users/typeorm/repositories/UsersRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  user_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ user_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const userExists = await usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("Could not find any customer with the given id.");
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError("Could not find any products with the given ids.");
    }

    const existsProductsIds = existsProducts.map((product) => product.id);

    const checkInexistentProducts = products.filter(
      (product) => !existsProductsIds.includes(product.id)
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`
      );
    }

    const quantityAvailable = products.filter(
      (product) =>
        existsProducts.filter((p) => p.id === product.id)[0].quantity <
        product.quantity
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}.`
      );
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter((p) => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      user: userExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map((product) => ({
      id: product.product_id,
      quantity:
        existsProducts.filter((p) => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);
    await ordersRepository.save(order);

    return order;
  }
}

export default CreateOrderService;
