import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match)
    private matchRepository: Repository<Match>,

    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  // Create a match, ensuring tournament exists, and winner/loser are optional
  async create(createMatchDto: CreateMatchDto) {
    const { tournamentId, winnerId, loserId, startDate, endDate } =
      createMatchDto;

    const tournament = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });
    if (!tournament) {
      throw new NotFoundException(
        `Tournament with id ${tournamentId} not found`,
      );
    }

    // Optional winner and loser users
    const match = this.matchRepository.create({
      tournament,
      startDate,
      endDate,
      winnerScore: 0, // default score
      loserScore: 0, // default score,
      winner: winnerId ? { id: winnerId } : null, // optional winner
      loser: loserId ? { id: loserId } : null, // optional loser
    });

    await this.matchRepository.save(match);

    return {
      message: 'The match was created',
    };
  }
  async findAll() {
    return await this.matchRepository.find({
      relations: ['tournament', 'winner', 'loser'],
    });
  }

  async findOne(id: number) {
    const match = await this.matchRepository.findOne({
      where: { id },
      relations: ['tournament', 'winner', 'loser'],
    });

    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }

    return match;
  }

  async update(id: number, updateMatchDto: UpdateMatchDto) {
    const match = await this.matchRepository.findOne({ where: { id } });

    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }

    Object.assign(match, updateMatchDto);
    await this.matchRepository.save(match);

    return {
      message: 'The match was updated',
    };
  }

  async remove(id: number) {
    const match = await this.matchRepository.findOne({
      where: { id, deletedAt: null }, // Only find non-deleted matches
    });

    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }

    match.deletedAt = new Date();
    await this.matchRepository.save(match);

    return {
      message: 'The match was deleted',
    };
  }
}
