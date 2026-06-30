import React, { createContext, memo, useState } from 'react';

export type Character = {
    id: string;
    position: {
        x: number;
        y: number;
    };
};

type State = {
    map: {
        rows: number;
        cols: number;
    };
    characters: Character[];
};

const Context = createContext<[State, React.Dispatch<React.SetStateAction<State>>] | null>(null);

export const GameState = {
    Provider: memo((props: { children: React.ReactNode }) => {
        const [state, setState] = useState({
            map: {
                rows: 24,
                cols: 24
            },
            characters: [
                {
                    id: '1',
                    position: {
                        x: 18,
                        y: 12
                    }
                }
            ]
        });

        return <Context.Provider value={[state, setState]}>{props.children}</Context.Provider>;
    }),
    useContext: () => {
        const context = React.useContext(Context);
        if (!context) throw new Error('GameState context is not available');
        return context;
    }
};
