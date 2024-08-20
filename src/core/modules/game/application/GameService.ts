import { EventBus } from 'core/shared/domain/EventBus';
import { Uuid } from 'core/shared/domain/Uuid';
import { GameSavedDomainEvent } from '../domain/events/GameSavedDomainEvent';
import { Game } from '../domain/Game';
import { GameRepository } from '../domain/GameRepository';
import { Player } from '../domain/Player';

export class GameService {
    data: Game | null = null;
    constructor(private readonly repository: GameRepository, private readonly eventBus: EventBus) {}

    async save() {
        if (!this.data) return;
        await this.repository.save(this.data);
        await this.eventBus.publish([new GameSavedDomainEvent(this.data)]);
    }

    async loadById(id: Game['id']) {
        this.data = await this.repository.findById(id);
        return this.data;
    }

    async create(id: Game['id']) {
        this.data = Game.create(id);
        this.save();
        return this.data;
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
