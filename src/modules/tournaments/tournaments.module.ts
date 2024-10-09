import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { CheckTournamentExistsService } from './check-tournament-exists.service';
import { UsersModule } from '../users/users.module';
import { TournamentPlayers } from '../tournament-players/entities/tournament-players.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tournament, TournamentPlayers]),
    UsersModule,
  ],
  controllers: [TournamentsController],
  providers: [TournamentsService, CheckTournamentExistsService],
})
export class TournamentsModule {}
