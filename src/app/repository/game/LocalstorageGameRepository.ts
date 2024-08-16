import { Game, GameRepository } from 'core/modules/game';

export class LocalstorageGameRepository implements GameRepository {
    async save(game: Game) {
        localStorage.setItem('game', JSON.stringify(game));
    }

    async findById(): Promise<Game> {
        const game = localStorage.getItem('game');

        if (!game) {
            throw new Error('Game not found');
        }
        return JSON.parse(game);
    }

    async delete() {
        localStorage.removeItem('game');
    }
}
