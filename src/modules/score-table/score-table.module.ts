import { Module } from '@nestjs/common';
import { ScoreTableService } from './score-table.service';
import { ScoreTableController } from './score-table.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreTable } from './entities/score-table.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ScoreTable])],
  controllers: [ScoreTableController],
  providers: [ScoreTableService],
})
export class ScoreTableModule {}
