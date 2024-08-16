import { Game, GameRepository } from 'core/modules/game';

export class LocalstorageGameRepository implements GameRepository {
    async save(game: Game) {
        const games = JSON.parse(localStorage.getItem('games') || '{}');
        const newGames = { ...games, [game.id as string]: game };

        localStorage.setItem('games', JSON.stringify(newGames));
    }

    async findById(id: Game['id']): Promise<Game> {
        const games = JSON.parse(localStorage.getItem('games') || '{}');
        const game = games[id as string];

        return game || null;
    }

    async findAll(): Promise<Game[]> {
        const games = JSON.parse(localStorage.getItem('games') || '{}');
        return Object.values(games);
    }

    async remove(id: Game['id']) {
        const games = JSON.parse(localStorage.getItem('games') || '{}');
        delete games[id as string];

        localStorage.setItem('games', JSON.stringify(games));
    }
}
