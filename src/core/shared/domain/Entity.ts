import { Uuid } from './Uuid';

export class Entity<Props extends { id: Uuid } = { id: Uuid }> {
    readonly id: Uuid;

    constructor(props: Props) {
        this.id = new Uuid(props.id as any);
    }
}
