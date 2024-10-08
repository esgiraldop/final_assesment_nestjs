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

  // All the properties down below are optional because do not need to be assigned when creating a tournament
  @ManyToMany(() => User, (user) => user.tournaments, { nullable: true })
  users?: User[];

  @OneToMany(() => Match, (match) => match.tournament, { nullable: true })
  matches?: Match[];

  @OneToOne(() => ScoreTable, (scoreTable) => scoreTable.tournament, {
    nullable: true,
  })
  scoreTable?: ScoreTable;
}
