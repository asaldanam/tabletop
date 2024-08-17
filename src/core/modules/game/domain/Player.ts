import { Entity } from '../../../shared/domain/Entity';
import { Uuid } from '../../../shared/domain/Uuid';

type PlayerProps = {
    id: Uuid;
    name: string;
};

export class Player extends Entity implements PlayerProps {
    readonly name: PlayerProps['name'];

    constructor(value: PlayerProps) {
        super(value);
        this.name = value.name;
    }

    static create({ id, name }: Pick<Player, 'id' | 'name'>) {
        return new Player({
            id,
            name
        });
    }
}
