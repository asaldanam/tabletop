import { Entity } from '../../../shared/domain/Entity';
import { Uuid } from '../../../shared/domain/Uuid';
import { Player } from './Player';

type GameProps = {
    id: Uuid;
    players: Array<Player>;
};

export class Game extends Entity implements GameProps {
    readonly players: GameProps['players'];

    constructor(value: GameProps) {
        super(value);
        this.players = value.players;
    }

    static create(id: GameProps['id']) {
        return new Game({
            id,
            players: []
        });
    }
}
