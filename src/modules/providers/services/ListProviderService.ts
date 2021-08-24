import { getCustomRepository } from "typeorm";
import Provider from "../typeorm/entities/Provider";
import ProvidersRepository from "../typeorm/repositories/ProvidersRepository";

class ListProvidersService {
  public async execute(): Promise<Provider[]> {
    const providersRepository = getCustomRepository(ProvidersRepository);

    const providers = await providersRepository.find();

    return providers;
  }
}

export default ListProvidersService;
