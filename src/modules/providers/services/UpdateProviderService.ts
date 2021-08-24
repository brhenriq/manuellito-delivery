import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Provider from "../typeorm/entities/Provider";
import ProvidersRepository from "../typeorm/repositories/ProvidersRepository";

interface IRequest {
  provider_id: string;
  name: string;
  last_name: string;
  cpf: string;
  password: string;
  old_password: string;
}

class UpdateProviderService {
  public async execute({ provider_id, name, password, old_password, last_name, cpf }: IRequest): Promise<Provider> {
    const providersRepository = getCustomRepository(ProvidersRepository);

    const provider = await providersRepository.findById(provider_id);
    
    if (!provider) {
      throw new AppError('Provider not found.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, provider.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      provider.password = await hash(password, 8);
    }


    provider.name = name;
    provider.last_name = last_name;
    provider.cpf = cpf;

    await providersRepository.save(provider);

    return provider;
  }
}

export default UpdateProviderService;
