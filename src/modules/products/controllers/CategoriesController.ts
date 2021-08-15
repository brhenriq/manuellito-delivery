import { Request, Response } from "express";
import CreateCategoryService from "../services/CreateCategoryService";

export default class CategoriesController {

  public async create(request: Request, response: Response): Promise<Response> {
    const {name} = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({name});

    return response.json(category);
  }
}
