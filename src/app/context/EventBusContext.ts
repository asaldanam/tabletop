import { createStore } from 'app/lib/react/createStore';
import { DomainEvent } from 'core/shared/domain/DomainEvent';
import { EventBus } from 'core/shared/domain/EventBus';
import { useEffect, useState } from 'react';

export const EventBusContext = createStore<EventBus>();

export function useEvents<P extends any>(selector?: (event: DomainEvent<P>) => boolean): Array<DomainEvent<P>> {
    const [events, setEvents] = useState([] as Array<DomainEvent<P>>);
    const { subscribe } = EventBusContext.useState();

    useEffect(() => {
        subscribe<P>((event) => {
            if (selector && !selector(event)) return;
            const updatedEvents: DomainEvent<P>[] = events ? [event, ...events] : [event];
            setEvents(updatedEvents);
        });
    }, [events, subscribe, selector]);

    return events;
}
