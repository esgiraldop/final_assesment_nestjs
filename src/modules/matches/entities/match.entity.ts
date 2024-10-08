import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Tournament } from 'src/modules/tournaments/entities/tournament.entity';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, (tournament) => tournament.matches)
  tournament: Tournament;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @ManyToOne(() => User, (user) => user.wonMatches, { nullable: true })
  winner?: User;

  @ManyToOne(() => User, (user) => user.lostMatches, { nullable: true })
  loser?: User;

  @Column()
  winnerScore: number;

  @Column()
  loserScore: number;
}
