import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import Category from "../typeorm/entities/Category";
import ProductRepository from "../typeorm/repositories/ProductsRepository";
import CategoryRepository from "../typeorm/repositories/CategoriesRepository";

interface IResponse {
  categories: Category[];
  products: Product[];
}

class ListProductService {
  public async execute(): Promise<IResponse> {
    const productsRepository = getCustomRepository(ProductRepository);
    const categoriesRepository = getCustomRepository(CategoryRepository);

    const categories = await categoriesRepository.find();
    const products = await productsRepository.find();

    return { categories, products };
  }
}

export default ListProductService;
