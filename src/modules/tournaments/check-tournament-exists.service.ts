import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';

@Injectable()
export class CheckTournamentExistsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  async check(tournamentId: number): Promise<Tournament> {
    const tournamentData = await this.tournamentRepository.findOne({
      where: { id: tournamentId },
    });
    console.log('\n\n\ntournamentData: ', tournamentData);
    if (!tournamentData) {
      throw new NotFoundException(
        `The tournament with id ${tournamentId} does not exist}`,
      );
    }

    return tournamentData;
  }
}
