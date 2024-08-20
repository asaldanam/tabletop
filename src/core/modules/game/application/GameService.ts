import { Uuid } from 'core/shared/domain/Uuid';
import { Game } from '../domain/Game';
import { GameRepository } from '../domain/GameRepository';
import { Player } from '../domain/Player';

export class GameService {
    data: Game | null = null;
    constructor(private readonly repository: GameRepository) {}

    async save() {
        if (!this.data) return;
        return this.repository.save(this.data);
    }

    async loadById(id: Game['id']) {
        this.data = await this.repository.findById(id);
        return this.data;
    }

    async create(id: Game['id']) {
        this.data = Game.create(id);
        return this.save();
    }

    async findAll() {
        return this.repository.findAll();
    }

    async addPlayer(id: Uuid, name: string) {
        const player = Player.create({ id, name });
        this.data?.players.push(player);
        return this.save();
    }
}
