import { Game } from './Game';

export interface GameRepository {
    save(game: Game): Promise<void>;
    findById(id: Game['id']): Promise<Game | null>;
    findAll(): Promise<Game[]>;
    remove(id: Game['id']): Promise<void>;
}
