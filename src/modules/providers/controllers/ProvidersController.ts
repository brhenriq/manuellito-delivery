import { Request, Response } from "express";
import CreateProviderService from "../services/CreateProviderService";
import DeleteProviderService from "../services/DeleteProviderService";
import ListProvidersService from "../services/ListProviderService";
import ShowProviderService from "../services/ShowProviderService";
import UpdateProviderService from "../services/UpdateProviderService";

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProviders = new ListProvidersService();

    const providers = await listProviders.execute();

    return response.json(providers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProvider = new ShowProviderService();

    const provider = await showProvider.execute({ id });

    return response.json(provider);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, last_name, cpf } = request.body;

    const createProvider = new CreateProviderService();

    const provider = await createProvider.execute({ name, password, last_name, cpf });

    return response.json(provider);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { provider_id, name, email, password, old_password, last_name, cpf } = request.body;

    const updateProvider = new UpdateProviderService();

    const provider = await updateProvider.execute({ provider_id, name, password, old_password, last_name, cpf });

    return response.json(provider);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProvider = new DeleteProviderService();

    await deleteProvider.execute({ id });

    return response.json([]);
  }
}
