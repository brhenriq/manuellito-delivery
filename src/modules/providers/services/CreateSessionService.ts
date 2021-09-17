import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";
import ProvidersRepository from "../typeorm/repositories/ProvidersRepository";
import Provider from "../typeorm/entities/Provider";

interface IRequest {
  cpf: string;
  password: string;
}

interface IResponse {
  provider: Provider;
  token: string;
}

class CreateSessionsService {
  public async execute({ cpf, password }: IRequest): Promise<IResponse> {
    const providersRepository = getCustomRepository(ProvidersRepository);
    const provider = await providersRepository.findByCpf(cpf);

    if (!provider) {
      throw new AppError("Incorrect cpf/password combination.", 401);
    }

    const passwordConfirmed = await compare(password, provider.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect cpf/password combination.", 401);
    }

    const token = sign({}, authConfig.jwt.secret_admin, {
      subject: provider.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      provider,
      token,
    };
  }
}

export default CreateSessionsService;
