import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import CategoryRepository from "../typeorm/repositories/CategoriesRepository";
import ProductRepository  from "../typeorm/repositories/ProductsRepository";

interface IRequest {
  name: string;
  description: string;
  brand: string;
  price: number;
  quantity: number;
  minimal_quantity: number;
  category_id: string;
}

class CreateProductService {
  public async execute({name, description, brand, price, quantity, minimal_quantity, category_id}: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const categoriesRepository = getCustomRepository(CategoryRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const categoryExists = await categoriesRepository.findById(category_id);

    if (!categoryExists) {
      throw new AppError('Category does not exists.');
    }

    const product = productsRepository.create({
      name,
      description,
      brand,
      price,
      quantity,
      minimal_quantity,
      category_id
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
