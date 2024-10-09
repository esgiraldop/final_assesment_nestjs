import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CheckUserExistsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async check(userId: number): Promise<User> {
    const userData = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userData) {
      throw new NotFoundException(`The user with id ${userId} does not exist`);
    }

    return userData;
  }
}
