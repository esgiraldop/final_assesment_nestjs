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

  @Column({ type: 'varchar', nullable: false, length: 100 })
  password: string;

  @Column()
  rank: number;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToMany(() => Tournament, (tournament) => tournament.users, {
    nullable: true,
  })
  @JoinTable()
  tournaments?: Tournament[]; // To be able to create users without the need of providing this

  @OneToMany(() => Match, (match) => match.winner, { nullable: true })
  wonMatches?: Match[];

  @OneToMany(() => Match, (match) => match.loser, { nullable: true })
  lostMatches?: Match[];
}
