import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
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
  user_id: string;
  name: string;
  last_name: string;
  cpf: string;
  email: string;
  password: string;
  old_password: string;
  phone_number: string;
  address_info: IAddress;
}

class UpdateProfileService {
  public async execute({ user_id, name, email, password, old_password, last_name, cpf, phone_number, address_info }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const addressRepository = getCustomRepository(AddressRepository);

    const user = await usersRepository.findById(user_id);
    
    if (!user) {
      throw new AppError('User not found.');
    }

    const address = await addressRepository.findById(user.address_id);

    console.log(user, address);

    if (!address) {
      throw new AppError('Address not found.');
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }


    user.name = name;
    user.email = email;
    user.last_name = last_name;
    user.cpf = cpf;
    user.phone_number = phone_number;

    address.cep = address_info.cep;
    address.city = address_info.city;
    address.complement = address_info.complement;
    address.number = address_info.number;
    address.road = address_info.road;
    address.state = address_info.state;

    await addressRepository.save(address);
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
