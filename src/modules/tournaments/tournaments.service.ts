import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentInputDto } from './dto/create-tournament-input.dto';
import { UpdateTournamentInputDto } from './dto/update-tournament-input.dto';
import { CreateTournamentOutputDto } from './dto/create-tournament-output.dto';

@UseGuards()
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

    // // Creating score_table
    // const scoreTableData = this.scoreTableRepository.create({
    //   tournament: { id: tournamentData.id },
    //   score:
    // });
    // this.tournamentRepository.save(tournamentData);

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

  update(id: number, updateTournamentDto: UpdateTournamentInputDto) {
    return `This action updates a #${id} tournament`;
  }

  remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
