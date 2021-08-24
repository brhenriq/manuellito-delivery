import { EntityRepository, Repository } from "typeorm";
import Provider from "../entities/Provider";

@EntityRepository(Provider)
class ProvidersRepository extends Repository<Provider> {
  public async findByName(name: string): Promise<Provider | undefined> {
    const provider = await this.findOne({
      where: {
        name,
      }
    });

    return provider;
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const provider = await this.findOne({
      where: {
        id,
      }
    });

    return provider;
  }

  public async findByCpf(cpf: string): Promise<Provider | undefined> {
    const provider = await this.findOne({
      where: {
        cpf,
      }
    });

    return provider;
  }
}

export default ProvidersRepository;
