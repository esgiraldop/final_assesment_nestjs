import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { RegisterUserDto } from '../dto/register-user-input.dto';
import { Repository } from 'typeorm';
import { RegisterResponseDto } from '../dto/register-user-output.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async register(
    registerUserDto: RegisterUserDto,
  ): Promise<RegisterResponseDto> {
    const usersbyEmail = await this.userRepository.find({
      where: { email: registerUserDto.email },
      relations: ['role'],
    });

    if (usersbyEmail.length > 0) {
      throw new ConflictException(
        `The user with email ${registerUserDto.email} already exists`,
      );
    }

    const password = registerUserDto.password;
    registerUserDto.password = await await bcrypt.hash(password, 10);

    const userData = this.userRepository.create({
      ...registerUserDto,
      role: { id: 2 },
      rank: 0,
      // tournaments: [{ id: 0 }], // Each tournament should be an object with an id
      // wonMatches: [{ id: 0 }], // Same for wonMatches and lostMatches
      // lostMatches: [{ id: 0 }],
    });

    await this.userRepository.save(userData);

    return {
      message: 'Registration successful',
    };
  }
}
