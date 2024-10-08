import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfigService } from './common/config/database.config';
import { ConfigModule } from '@nestjs/config';
import { EnvConfig } from './common/config/env.config';
import { AuthModule } from './modules/auth/auth.module';
import { AppSeeder } from './common/seeders/app.seeder';
import { RoleSeeder } from './common/seeders/roles.seeder';
import { JwtStrategy } from './modules/auth/strategies/jwt.strategy';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { MatchesModule } from './modules/matches/matches.module';
import { TournamentsModule } from './modules/tournaments/tournaments.module';
import { TournamentPlayersModule } from './modules/tournament-players/tournament-players.module';
import { UserSeeder } from './common/seeders/users.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [EnvConfig],
    }),
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfigService }),
    AuthModule,
    UsersModule,
    RolesModule,
    MatchesModule,
    TournamentsModule,
    TournamentPlayersModule,
  ],
  controllers: [],
  providers: [AppSeeder, RoleSeeder, JwtStrategy, UserSeeder],
})
export class AppModule {}
