import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentPlayers } from './entities/tournament-players.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TournamentPlayers])],
  controllers: [],
  providers: [],
})
export class TournamentPlayersModule {}
