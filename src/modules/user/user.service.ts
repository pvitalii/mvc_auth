import { PostgresDataSource } from '../../database/app-data-source';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

export class UserService {
  constructor(private userRepository = PostgresDataSource.getRepository(User)) {}

  findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  findByLogin(login: string): Promise<User | null> {
    return this.userRepository.findOneBy({ login });
  }

  createOne(dto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }
}
