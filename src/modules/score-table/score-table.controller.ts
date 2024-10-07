import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ScoreTableService } from './score-table.service';
import { CreateScoreTableDto } from './dto/create-score-table.dto';
import { UpdateScoreTableDto } from './dto/update-score-table.dto';

@Controller('score-table')
export class ScoreTableController {
  constructor(private readonly scoreTableService: ScoreTableService) {}

  @Post()
  create(@Body() createScoreTableDto: CreateScoreTableDto) {
    return this.scoreTableService.create(createScoreTableDto);
  }

  @Get()
  findAll() {
    return this.scoreTableService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreTableService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreTableDto: UpdateScoreTableDto) {
    return this.scoreTableService.update(+id, updateScoreTableDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreTableService.remove(+id);
  }
}
