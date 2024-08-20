import { Uuid } from './Uuid';

interface DomainEventProps<P extends any> {
    id: Uuid;
    name: string;
    payload: P;
}

export class DomainEvent<P extends any> implements DomainEventProps<P> {
    public readonly date: Date = new Date();
    public readonly id: Uuid = crypto.randomUUID();

    constructor(public readonly name: string, public readonly payload: P) {}
}
