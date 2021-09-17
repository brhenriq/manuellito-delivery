import { Request, Response } from "express";
import CreateSessionsService from "../services/CreateSessionService";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const createSession = new CreateSessionsService();

    const provider = await createSession.execute({
      cpf,
      password,
    });

    return response.json(provider);
  }
}
