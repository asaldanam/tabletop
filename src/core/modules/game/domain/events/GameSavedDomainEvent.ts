import { DomainEvent } from 'core/shared/domain/DomainEvent';
import { Game } from '../Game';

export class GameSavedDomainEvent extends DomainEvent<Game> {
    constructor(payload: Game) {
        super('game-saved', payload);
    }
}
