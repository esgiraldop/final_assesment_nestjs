import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TournamentsService } from './tournaments.service';
import { CreateTournamentInputDto } from './dto/create-tournament-input.dto';
import { UpdateTournamentInputDto } from './dto/update-tournament-input.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/authentication.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateTournamentOutputDto } from './dto/create-tournament-output.dto';

@Controller('tournaments')
@ApiTags('Tournament')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Roles(1)
  @Post()
  async create(
    @Body() createTournamentDto: CreateTournamentInputDto,
  ): Promise<CreateTournamentOutputDto> {
    return await this.tournamentsService.create(createTournamentDto);
  }

  @Roles(1, 2)
  @Get('getall')
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Roles(1, 2)
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @Roles(1)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentInputDto,
  ) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @Roles(1)
  @Delete('remove/:id')
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }

  @Roles(2)
  @Post('user/enroll')
  async enrollUser(
    @Body('userId') userId: number,
    @Body('tournamentId') tournamentId: number,
  ) {
    return this.tournamentsService.enrollTournament(+userId, +tournamentId);
  }

  @Roles(1, 2)
  @Post(':id/generate-random-matches')
  async generateRandomMatches(@Param('id') tournamentId: string) {
    // Endpoint for generating matches between all the users enrolled in a tournament. All the players play against all each other in the same tournament. The matches are generated in random dates between the days of the tournament. The winner and the loser user is assigned randomly with a proabbilitu of 50% of winning or losing

    return await this.tournamentsService.generateRandomMatches(+tournamentId);
  }
}
