import { ApiProperty } from '@nestjs/swagger';

export class UpdateTournamentOutputDto {
  @ApiProperty({
    description: 'Success or error message.',
    example: 'Tournament updated',
  })
  message: string;
}
