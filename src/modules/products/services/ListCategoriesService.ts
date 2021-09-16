import { getCustomRepository } from "typeorm";
import Category from "../typeorm/entities/Category";
import CategoryRepository from "../typeorm/repositories/CategoriesRepository";

class ListCategoriesService {
  public async execute(): Promise<Category[]> {
    const categoriesRepository = getCustomRepository(CategoryRepository);

    const categories = await categoriesRepository.find();

    return categories;
  }


}

export default ListCategoriesService;
