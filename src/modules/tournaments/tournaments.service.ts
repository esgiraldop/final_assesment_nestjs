import { Injectable, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tournament } from './entities/tournament.entity';
import { CreateTournamentInputDto } from './dto/create-tournament-input.dto';
import { UpdateTournamentInputDto } from './dto/update-tournament-input.dto';
import { CreateTournamentOutputDto } from './dto/create-tournament-output.dto';
import { JwtAuthGuard } from 'src/common/guards/authentication.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { CheckTournamentExistsService } from './check-tournament-exists.service';
import { CheckUserExistsService } from '../users/check-user-exists.service';
import { IAdditionalTournamentProperties } from './interfaces/additional-tournament-properties.interface';
import { TournamentPlayers } from '../tournament-players/entities/tournament-players.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    @InjectRepository(TournamentPlayers)
    private tournamentPlayersRepository: Repository<TournamentPlayers>,
    private checkTournamentExistsService: CheckTournamentExistsService,
    private checkUserExistsService: CheckUserExistsService,
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

  async findAll() {
    const tournaments = await this.tournamentRepository.find();

    return tournaments;
  }

  async findOne(id: number) {
    const tournament = await this.checkTournamentExistsService.check(id);

    return tournament;
  }

  async update(
    id: number,
    updateTournamentDto: UpdateTournamentInputDto,
    additionalProperties?: IAdditionalTournamentProperties,
    message: string = 'The tournament was updated succesfully',
  ) {
    await this.checkTournamentExistsService.check(id);

    await this.tournamentRepository.update(id, {
      ...updateTournamentDto,
      ...additionalProperties,
    });

    return {
      message,
    };
  }

  async remove(id: number) {
    const tournament = await this.checkTournamentExistsService.check(id);

    await this.tournamentRepository.remove(tournament);

    return {
      message: `Tournament with id ${id} has been removed successfully`,
    };
  }

  async enrollTournament(userId: number, tournamentId: number) {
    console.log('userId: ', userId);
    const tournament =
      await this.checkTournamentExistsService.check(tournamentId);

    const user = await this.checkUserExistsService.check(userId);

    const tournamentPlayerData = this.tournamentPlayersRepository.create({
      tournament,
      user,
      score: 0, // When first user is added
    });

    await this.tournamentPlayersRepository.save(tournamentPlayerData);

    return {
      message: `The user ${user.id} was enrolled succesfully in tournament with id ${tournament.id}`,
    };
  }
}
