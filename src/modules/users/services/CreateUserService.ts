import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import AddressRepository from "../typeorm/repositories/AddressRepository";
import UsersRepository from "../typeorm/repositories/UsersRepository";

interface IAddress {
  cep: string;
  road: string;
  city: string;
  state: string;
  complement: string;
  number: string;
}

interface IRequest {
  name: string;
  last_name: string;
  cpf: string;
  email: string;
  password: string;
  phone_number: string;
  address_info: IAddress;
}

class CreateUserService {
  public async execute({ name, email, password, last_name, cpf, phone_number, address_info }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressRepository = getCustomRepository(AddressRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const address = await addressRepository.save(address_info);

    const hashedPassword = await hash(password, 8);

    const user = await usersRepository.create({
      address_id: address.id,
      cpf,
      email,
      last_name,
      phone_number,
      name,
      password: hashedPassword,
    })

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
