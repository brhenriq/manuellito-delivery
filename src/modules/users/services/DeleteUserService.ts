import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import AddressRepository from "../typeorm/repositories/AddressRepository";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id } : IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressRepository = getCustomRepository(AddressRepository);

    const user = await usersRepository.findOne(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const address = await addressRepository.findById(user.address_id);

    if (!address) {
      throw new AppError('Address not found.');
    }

    addressRepository.remove(address)
    usersRepository.remove(user);
  }
}

export default DeleteUserService;
