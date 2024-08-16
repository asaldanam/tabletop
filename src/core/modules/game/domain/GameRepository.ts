import { Uuid } from 'core/shared/domain/Uuid';
import { Game } from './Game';

export interface GameRepository {
    save(game: Game): Promise<void>;
    findById(id: Uuid): Promise<Game>;
    delete(): Promise<void>;
}
