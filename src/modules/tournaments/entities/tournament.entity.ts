import { Match } from 'src/modules/matches/entities/match.entity';
import { ScoreTable } from 'src/modules/score-table/entities/score-table.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  OneToOne,
} from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  location: string;

  @ManyToMany(() => User, (user) => user.tournaments)
  users: User[];

  @OneToMany(() => Match, (match) => match.tournament)
  matches: Match[];

  @OneToOne(() => ScoreTable, (scoreTable) => scoreTable.tournament)
  scoreTable: ScoreTable;
}
