import { Match } from 'src/modules/matches/entities/match.entity';
import { User } from 'src/modules/users/entities/user.entity';

export interface IAdditionalTournamentProperties {
  user?: User[];
  match?: Match[];
}
