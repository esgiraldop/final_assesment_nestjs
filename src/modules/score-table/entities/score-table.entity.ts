import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('score_table')
export class ScoreTable {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Tournament, (tournament) => tournament.scoreTable)
  @JoinColumn()
  tournament: Tournament;

  @Column()
  score: number;
}
