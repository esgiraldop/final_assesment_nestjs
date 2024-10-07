import { Test, TestingModule } from '@nestjs/testing';
import { ScoreTableService } from './score-table.service';

describe('ScoreTableService', () => {
  let service: ScoreTableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoreTableService],
    }).compile();

    service = module.get<ScoreTableService>(ScoreTableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
