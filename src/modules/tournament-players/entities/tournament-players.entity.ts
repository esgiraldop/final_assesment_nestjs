import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('tournament_players')
export class TournamentPlayers {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.tournamentPlayers)
  @JoinColumn()
  tournament: Tournament;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User;

  @Column()
  score: number;
}
