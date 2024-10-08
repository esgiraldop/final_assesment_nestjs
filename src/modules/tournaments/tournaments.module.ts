import { Module } from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { TournamentsController } from './tournaments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { ScoreTable } from '../score-table/entities/score-table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tournament, ScoreTable])],
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
