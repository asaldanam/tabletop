import { Game } from '../domain/Game';
import { GameRepository } from '../domain/GameRepository';

export class GameService {
    constructor(private readonly repository: GameRepository) {}

    async save(game: Game) {
        return this.repository.save(game);
    }

    async findById(id: Game['id']) {
        return this.repository.findById(id);
    }

    async findAll() {
        return this.repository.findAll();
    }
}
