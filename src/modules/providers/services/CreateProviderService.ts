import AppError from "../../../shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import Provider from "../typeorm/entities/Provider";
import ProvidersRepository from "../typeorm/repositories/ProvidersRepository";

interface IRequest {
  name: string;
  last_name: string;
  cpf: string;
  password: string;
}

class CreateProviderService {
  public async execute({ name, password, last_name, cpf }: IRequest): Promise<Provider> {
    const providersRepository = getCustomRepository(ProvidersRepository);

    const providerExists = await providersRepository.findByCpf(cpf);

    if (providerExists) {
      throw new AppError('CPF address already exists.');
    }

    const hashedPassword = await hash(password, 8);

    const provider = await providersRepository.create({
      cpf,
      last_name,
      name,
      password: hashedPassword,
    })

    await providersRepository.save(provider);

    return provider;
  }
}

export default CreateProviderService;
