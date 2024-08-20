interface DomainEventProps<P extends any> {
    name: string;
    payload: P;
}

export class DomainEvent<P extends any> implements DomainEventProps<P> {
    public readonly date: Date = new Date();
    constructor(public readonly name: string, public readonly payload: P) {}
}
