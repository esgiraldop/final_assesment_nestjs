import { Match } from 'src/modules/matches/entities/match.entity';
import { Role } from 'src/modules/roles/roles.entity';
import { TournamentPlayers } from 'src/modules/tournament-players/entities/tournament-players.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: false, length: 255 })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: 100 })
  password: string;

  @Column()
  rank: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(
    () => TournamentPlayers,
    (tournamentPlayers) => tournamentPlayers.user,
  )
  tournamentPlayer?: TournamentPlayers[];

  @OneToMany(() => Match, (match) => match.winner, { nullable: true })
  wonMatches?: Match[];

  @OneToMany(() => Match, (match) => match.loser, { nullable: true })
  lostMatches?: Match[];
}
