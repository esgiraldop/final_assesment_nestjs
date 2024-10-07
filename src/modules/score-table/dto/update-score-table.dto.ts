import { PartialType } from '@nestjs/swagger';
import { CreateScoreTableDto } from './create-score-table.dto';

export class UpdateScoreTableDto extends PartialType(CreateScoreTableDto) {}
