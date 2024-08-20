import { DomainEvent } from 'core/shared/domain/DomainEvent';
import { EventBus } from 'core/shared/domain/EventBus';
import EventEmitter from 'events';

// This is a simple implementation of the EventBus interface using Node.js EventEmitter
const bus: EventEmitter = new EventEmitter();

export class EventEmmiterEventBus implements EventBus {
    async publish<P extends any>(events: DomainEvent<P>[]): Promise<void> {
        events.forEach((event) => {
            bus.emit('event-bus', event);
        });
    }

    subscribe<P extends any>(handler: (event: DomainEvent<P>) => void): void {
        bus.on('event-bus', handler);
    }
}
