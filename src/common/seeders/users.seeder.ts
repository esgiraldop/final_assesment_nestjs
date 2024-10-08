import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async insert(): Promise<void> {
    const existingUsers = await this.entityManager.query(`
      SELECT email FROM users WHERE email IN ('admin@example.com', 'player1@example.com', 'player2@example.com')
    `);

    if (existingUsers.length > 0) {
      console.log('Users already exist, skipping insertion.');
      return;
    }

    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('adminpassword', saltRounds);
    const playerPassword = await bcrypt.hash('playerpassword', saltRounds);

    await this.entityManager.query(`
      INSERT INTO users (name, email, password, rank, "roleId") VALUES
      ('Admin User', 'admin@example.com', '${adminPassword}', 0, 1),
      ('Player One', 'player1@example.com', '${playerPassword}', 1000, 2),
      ('Player Two', 'player2@example.com', '${playerPassword}', 1000, 2)
    `);

    console.log('Users seeded successfully.');
  }
}
