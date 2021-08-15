import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import DeleteUserService from "../services/DeleteUserService";
import ListUserService from "../services/ListUserService";
import ShowProfileService from "../services/ShowProfileService";
import UpdateProfileService from "../services/UpdateProfileService";

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProfile = new ShowProfileService();

    const profie = await showProfile.execute({ id });

    return response.json(profie);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, last_name, cpf, phone_number, address_info } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password, last_name, cpf, phone_number, address_info });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id, name, email, password, old_password, last_name, cpf, phone_number, address_info } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({ user_id, name, email, password, old_password, last_name, cpf, phone_number, address_info });

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUser = new DeleteUserService();

    await deleteUser.execute({ id });

    return response.json([]);
  }
}
