import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const usersbyEmail = await this.userRepository.find({
      where: { email: registerUserDto.email },
      relations: ['role'],
    });

    if (usersbyEmail.length > 0) {
      throw new ConflictException(
        `The user with email ${registerUserDto.email} already exists`,
      );
    }

    const userData = this.userRepository.create({
      ...registerUserDto,
      role: { id: 2 },
    });
    return await this.userRepository.save(userData);
  }
}
