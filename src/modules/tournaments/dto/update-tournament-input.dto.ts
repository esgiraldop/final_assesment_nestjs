import { PartialType } from '@nestjs/swagger';
import { CreateTournamentInputDto } from './create-tournament-input.dto';

export class UpdateTournamentInputDto extends PartialType(
  CreateTournamentInputDto,
) {}
