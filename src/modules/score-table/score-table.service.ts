import { Injectable } from '@nestjs/common';
import { CreateScoreTableDto } from './dto/create-score-table.dto';
import { UpdateScoreTableDto } from './dto/update-score-table.dto';

@Injectable()
export class ScoreTableService {
  create(createScoreTableDto: CreateScoreTableDto) {
    return 'This action adds a new scoreTable';
  }

  findAll() {
    return `This action returns all scoreTable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} scoreTable`;
  }

  update(id: number, updateScoreTableDto: UpdateScoreTableDto) {
    return `This action updates a #${id} scoreTable`;
  }

  remove(id: number) {
    return `This action removes a #${id} scoreTable`;
  }
}
