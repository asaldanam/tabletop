import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { createObjectMutationObserver } from '../createObjectMutationObserver';

export function createStore<Store extends object>() {
    const Context = createContext<Store>(null as any);

    const Provider = ({ children, value }: PropsWithChildren<{ value: Store }>) => {
        const [object, setObject] = useState<Store>(
            createObjectMutationObserver(value, {
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

    const _useState = () => {
        const object = useContext(Context);
        return object;
    };

    return { Provider, useState: _useState };
}
