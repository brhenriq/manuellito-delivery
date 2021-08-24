import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import ProvidersRepository from "../typeorm/repositories/ProvidersRepository";

interface IRequest {
  id: string;
}

class DeleteProviderService {
  public async execute({ id } : IRequest): Promise<void> {
    const providersRepository = getCustomRepository(ProvidersRepository);

    const provider = await providersRepository.findOne(id);

    if (!provider) {
      throw new AppError('Provider not found.');
    }

    providersRepository.remove(provider);
  }
}

export default DeleteProviderService;
