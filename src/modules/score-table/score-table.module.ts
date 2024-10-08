import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreTable } from './entities/score-table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreTable])],
  controllers: [],
  providers: [],
})
export class ScoreTableModule {}
