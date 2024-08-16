import { Game } from '../domain/Game';
import { GameRepository } from '../domain/GameRepository';

export class GameService {
    game: Game | null = null;

    constructor(private readonly repository: GameRepository) {}

    async create() {
        this.game = new Game({
            id: crypto.randomUUID(),
            players: []
        });
        await this.save();
    }

    async save() {
        if (!this.game) return;
        return this.repository.save(this.game);
    }
}
