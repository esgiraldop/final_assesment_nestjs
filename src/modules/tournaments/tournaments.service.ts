import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentInputDto } from './dto/create-tournament-input.dto';
import { UpdateTournamentInputDto } from './dto/update-tournament-input.dto';
import { CreateTournamentOutputDto } from './dto/create-tournament-output.dto';
import { JwtAuthGuard } from 'src/common/guards/authentication.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async create(
    createTournamentDto: CreateTournamentInputDto,
  ): Promise<CreateTournamentOutputDto> {
    const tournamentData =
      this.tournamentRepository.create(createTournamentDto);
    this.tournamentRepository.save(tournamentData);

    return {
      message: 'The tournament was created',
    };
  }

  findAll() {
    return `This action returns all tournaments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tournament`;
  }

  async update(id: number, updateTournamentDto: UpdateTournamentInputDto) {
    const tournamentData = this.tournamentRepository.findOne({ where: { id } });

    if (!tournamentData) {
      throw new NotFoundException(
        `The tournament with id ${id} does not exist}`,
      );
    }

    await this.tournamentRepository.update(id, { ...updateTournamentDto });

    return {
      message: 'The tournament was updated succesfully',
    };
  }

  async remove(id: number) {
    const tournament = await this.tournamentRepository.findOne({
      where: { id },
    });

    if (!tournament) {
      throw new NotFoundException(`Tournament with id ${id} does not exist`);
    }

    await this.tournamentRepository.remove(tournament);

    return {
      message: `Tournament with id ${id} has been removed successfully`,
    };
  }
}
