import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateTournamentInputDto {
  @ApiProperty({
    example: 'Tournament name',
  })
  @IsString()
  @IsNotEmpty({ message: 'The tournament name cannot be empty' })
  name: string;

  @ApiProperty({
    example: '2024-05-06',
  })
  @IsDateString()
  @IsNotEmpty({ message: 'The start date cannot be empty' })
  startDate: Date;

  @ApiProperty({
    example: '2024-05-06',
  })
  @IsDateString()
  @IsNotEmpty({ message: 'The end date cannot be empty' })
  endDate: Date;

  @ApiProperty({
    example: 'Abu Dhabi',
  })
  @IsString()
  @IsNotEmpty({ message: 'The location cannot be empty' })
  location: string;

  // All the properties down below do not need to be provided when creating a tournament

  // @ApiProperty({
  //   example: [1, 2, 3],
  //   description: 'An array of user IDs associated with the tournament.',
  // })
  // @IsArray()
  // users: number[];

  // @ApiProperty({
  //   example: [1, 2, 3],
  //   description: 'An array of match IDs associated with the tournament.',
  // })
  // @IsArray()
  // @IsNotEmpty({ message: 'The matches id must not be empty' })
  // @ArrayMinSize(1)
  // matches: number[];

  // @ApiProperty({
  //   example: 1,
  //   description: 'The id of the score table associated',
  // })
}
