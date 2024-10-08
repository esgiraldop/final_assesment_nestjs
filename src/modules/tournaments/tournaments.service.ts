import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentInputDto } from './dto/create-tournament-input.dto';
import { UpdateTournamentInputDto } from './dto/update-tournament-input.dto';

@UseGuards()
@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async create(createTournamentDto: CreateTournamentInputDto) {
    const tournamentData =
      this.tournamentRepository.create(createTournamentDto);
    return await this.tournamentRepository.save(tournamentData);
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
