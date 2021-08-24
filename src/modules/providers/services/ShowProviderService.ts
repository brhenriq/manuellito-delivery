import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Provider from "../typeorm/entities/Provider";
import ProvidersRepository from "../typeorm/repositories/ProvidersRepository";

interface IRequest {
  id: string;
}

class ShowProviderService {
  public async execute({ id }: IRequest): Promise<Provider> {
    const providersRepository = getCustomRepository(ProvidersRepository);

    const provider = await providersRepository.findById(id);

    if (!provider) {
      throw new AppError('Provider not found.');
    }

    return provider;
  }
}

export default ShowProviderService;
