import { DomainEvent } from './DomainEvent';

export interface EventBus {
    publish<P extends any>(events: DomainEvent<P>[]): Promise<void>;
    subscribe<P extends any>(handler: (event: DomainEvent<P>) => void): void;
}
