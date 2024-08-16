import { createContext, useState } from 'react';
import { createObjectMutationObserver } from '../utils/createObjectMutationObserver';

export function createContextFromObject<O extends object>(initialState: O) {
    const Context = createContext<O>(initialState);

    const Provider = ({ children }: { children: React.ReactNode }) => {
        const [object, setObject] = useState<O>(
            createObjectMutationObserver(initialState, {
                onMutation(obj) {
                    setObject(obj);
                }
            })
        );

        return (
            <>
                <Context.Provider value={object}>{children}</Context.Provider>
            </>
        );
    };

    return { Provider, Context };
}
