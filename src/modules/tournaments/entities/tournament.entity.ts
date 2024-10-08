import { Match } from 'src/modules/matches/entities/match.entity';
import { TournamentPlayers } from 'src/modules/tournament-players/entities/tournament-players.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

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

  @OneToMany(() => TournamentPlayers, (match) => match.tournament, {
    nullable: true,
  })
  tournamentPlayers?: TournamentPlayers[];

  @OneToMany(() => Match, (match) => match.tournament, { nullable: true })
  matches?: Match[];
}
