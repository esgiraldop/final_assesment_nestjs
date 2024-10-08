import { ConflictException, Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentInputDto } from './dto/create-tournament-input.dto';
import { UpdateTournamentInputDto } from './dto/update-tournament-input.dto';
import { CreateTournamentOutputDto } from './dto/create-tournament-output.dto';
import { JwtAuthGuard } from 'src/common/guards/authentication.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  @Roles(1)
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

  @Roles(1, 2)
  findAll() {
    return `This action returns all tournaments`;
  }

  @Roles(1, 2)
  findOne(id: number) {
    return `This action returns a #${id} tournament`;
  }

  @Roles(1)
  async update(id: number, updateTournamentDto: UpdateTournamentInputDto) {
    const tournamentData = this.tournamentRepository.findOne({ where: { id } });

    if (!tournamentData) {
      throw new ConflictException(
        `The tournament with id ${id} does not exist}`,
      );
    }

    await this.tournamentRepository.update(id, { ...updateTournamentDto });

    return {
      message: 'The tournament was updated succesfully',
    };
  }

  @Roles(1)
  remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
