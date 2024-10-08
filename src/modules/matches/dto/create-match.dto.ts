import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateMatchDto {
  @IsInt()
  tournamentId: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @IsOptional()
  @IsInt()
  winnerId?: number;

  @IsOptional()
  @IsInt()
  loserId?: number;

  @IsOptional()
  @IsInt()
  winnerScore?: number = 0;

  @IsOptional()
  @IsInt()
  loserScore?: number = 0;
}
