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

@Controller('tournaments')
@ApiTags('Tournament')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TournamentsController {
  constructor(private readonly tournamentsService: TournamentsService) {}

  @Roles(1)
  @Post()
  create(@Body() createTournamentDto: CreateTournamentInputDto) {
    return this.tournamentsService.create(createTournamentDto);
  }

  @Roles(1, 2)
  @Get()
  findAll() {
    return this.tournamentsService.findAll();
  }

  @Roles(1, 2)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentsService.findOne(+id);
  }

  @Roles(1)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentInputDto,
  ) {
    return this.tournamentsService.update(+id, updateTournamentDto);
  }

  @Roles(1)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentsService.remove(+id);
  }
}
