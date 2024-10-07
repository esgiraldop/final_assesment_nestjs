import { Test, TestingModule } from '@nestjs/testing';
import { ScoreTableController } from './score-table.controller';
import { ScoreTableService } from './score-table.service';

describe('ScoreTableController', () => {
  let controller: ScoreTableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreTableController],
      providers: [ScoreTableService],
    }).compile();

    controller = module.get<ScoreTableController>(ScoreTableController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
