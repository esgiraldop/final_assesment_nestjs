import { ApiProperty } from '@nestjs/swagger';

export class CreateTournamentOutputDto {
  @ApiProperty({
    description: 'Success or error message.',
    example: 'The tournament was created',
  })
  message: string;
}
