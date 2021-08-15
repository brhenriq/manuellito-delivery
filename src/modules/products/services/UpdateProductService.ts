import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRepository from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  id: string;
  name: string;
  description: string;
  brand: string;
  price: number;
  quantity: number;
  category_id: string;
}

class UpdateProductService {
  public async execute({ id, name, price, quantity, description, brand, category_id } : IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;
    product.description = description;
    product.brand = brand;
    product.category_id = category_id;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
