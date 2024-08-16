import { Game } from '../domain/Game';
import { GameRepository } from '../domain/GameRepository';

export class GameService {
    constructor(private readonly repository: GameRepository) {}

    async save(game: Game) {
        return this.repository.save(game);
    }
}
