import { ConflictException, Injectable, UseGuards } from '@nestjs/common';
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
import { User } from '../users/entities/user.entity';
import { generatePlayerClashes } from './utilities/generate-player-clashes.utility';
import { MatchesService } from '../matches/matches.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Injectable()
export class TournamentsService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    @InjectRepository(TournamentPlayers)
    private tournamentPlayersRepository: Repository<TournamentPlayers>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private checkTournamentExistsService: CheckTournamentExistsService,
    private checkUserExistsService: CheckUserExistsService,
    private matchesService: MatchesService,
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

  async getUsersEnrolledInTournament(tournamentId: number): Promise<User[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.tournamentPlayer', 'tournamentPlayers')
      .innerJoin('tournamentPlayers.tournament', 'tournament')
      .where('tournament.id = :tournamentId', { tournamentId })
      .select(['user.id', 'user.name', 'user.email'])
      .getMany();

    return users;
  }

  async createMatchesForClashes(
    tournamentId: number,
    clashes: number[][],
    startDate: Date,
    endDate: Date,
  ): Promise<void> {
    for (const [player1Id, player2Id] of clashes) {
      // Create a match for the current clash
      const createMatchDto = {
        tournamentId,
        startDate,
        endDate,
        winnerId: Math.random() > 0.5 ? player1Id : player2Id, // Optionally random winner
        loserId: Math.random() > 0.5 ? player2Id : player1Id, // Optionally random loser
      };

      try {
        await this.matchesService.create(createMatchDto);
        console.log(
          `Match created: Player ${player1Id} vs Player ${player2Id}`,
        );
      } catch (error) {
        console.error(
          `Error creating match for Player ${player1Id} vs Player ${player2Id}: ${error.message}`,
        );
      }
    }
  }

  async generateRandomMatches(tournamentId: number) {
    // getting tournament data and validating it actually exists
    const tournamentData = this.findOne(tournamentId);

    const tournamentUsers =
      await this.getUsersEnrolledInTournament(tournamentId);

    const tournamentUsersIds = tournamentUsers.map((user: User) => user.id);

    if (tournamentUsersIds.length % 2 !== 0) {
      // All the users have to play the same number of matches
      throw new ConflictException(
        'Odd number of players, Please remove or add another player to the tournament',
      );
    }

    //Based on the users ids, get random pairs
    const clashes = generatePlayerClashes(tournamentUsersIds);
    console.log('clashes: ', clashes);
    // Creating the matches
    await this.createMatchesForClashes(
      tournamentId,
      clashes,
      (await tournamentData).startDate,
      (await tournamentData).endDate,
    );

    return {
      message: 'All the matches were created sucessfully',
    };
  }
}
