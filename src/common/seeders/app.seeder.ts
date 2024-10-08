import { Injectable, OnModuleInit } from '@nestjs/common';
import { RoleSeeder } from './roles.seeder';
import { UserSeeder } from './users.seeder';

@Injectable()
export class AppSeeder implements OnModuleInit {
  constructor(
    private roleSeeder: RoleSeeder,
    private userSeeder: UserSeeder,
  ) {}

  async onModuleInit() {
    await this.roleSeeder.insert();
    await this.userSeeder.insert();
  }
}
