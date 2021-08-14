import { EntityRepository, In, Repository } from "typeorm";
import User from "../entities/User";

interface IFindUsers {
  id: string;
}

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        name,
      }
    });

    return user;
  }

  public async findAllByIds(users: IFindUsers[]): Promise<User[]> {
    const userIds = users.map(user => user.id);

    const existsUsers = await this.find({
      where: {
        id: In(userIds)
      }
    });

    return existsUsers;
  }
}

export default UserRepository;