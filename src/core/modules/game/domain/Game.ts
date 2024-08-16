import { Entity } from '../../../shared/domain/Entity';
import { Uuid } from '../../../shared/domain/Uuid';

type GameProps = {
    id: Uuid;
    players: Array<{
        id: Uuid;
        name: string;
        games: Uuid[];
    }>;
};

export class Game extends Entity implements GameProps {
    readonly players: GameProps['players'];

    constructor(value: GameProps) {
        super(value);
        this.players = value.players;
    }
}
