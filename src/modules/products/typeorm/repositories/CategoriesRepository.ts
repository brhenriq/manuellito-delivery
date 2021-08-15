import { EntityRepository, In, Repository } from "typeorm";
import Category from "../entities/Category";

interface IFindCategories {
  id: string;
}

@EntityRepository(Category)
class CategoryRepository extends Repository<Category> {
  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.findOne({
      where: {
        name,
      }
    });

    return category;
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = this.findOne({
      where: {
        id,
      }
    });

    return category;
  }

  public async findAllByIds(categories: IFindCategories[]): Promise<Category[]> {
    const categoryIds = categories.map(category => category.id);

    const existsCategories = await this.find({
      where: {
        id: In(categoryIds)
      }
    });

    return existsCategories;
  }
}

export default CategoryRepository;