import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity) private usersRepo: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string) {
    return await this.usersRepo.findOneBy({ email });
  }

  async findById(id: string) {
    return await this.usersRepo.findOneBy({ id });
  }
}
