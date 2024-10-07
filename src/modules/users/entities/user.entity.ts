import { Match } from 'src/modules/matches/entities/match.entity';
import { Role } from 'src/modules/roles/roles.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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

  @Column({ type: 'varchar', nullable: false, length: 30 })
  password: string;

  @Column()
  rank: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToMany(() => Tournament, (tournament) => tournament.users)
  @JoinTable()
  tournaments: Tournament[];

  @OneToMany(() => Match, (match) => match.winner)
  wonMatches: Match[];

  @OneToMany(() => Match, (match) => match.loser)
  lostMatches: Match[];
}
