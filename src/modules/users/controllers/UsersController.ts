import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, last_name, cpf, phone_number, address_info } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password, last_name, cpf, phone_number, address_info });

    return response.json(user);
  }
}
