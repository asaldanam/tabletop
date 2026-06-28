import React, { createContext, memo, useState } from 'react';

type State = {
    camera: {
        zoom: number;
    };
    map: {
        rows: number;
        cols: number;
        cell: {
            size: number;
        };
    };
    character: {
        position: {
            x: number;
            y: number;
        };
    };
};

const Context = createContext<[State, React.Dispatch<React.SetStateAction<State>>] | null>(null);

export const GameState = {
    Provider: memo((props: { children: React.ReactNode }) => {
        const [state, setState] = useState({
            camera: {
                zoom: 1
            },
            map: {
                rows: 24,
                cols: 24,
                cell: {
                    size: 64
                }
            },
            character: {
                position: {
                    x: 18,
                    y: 12
                }
            }
        });

        return <Context.Provider value={[state, setState]}>{props.children}</Context.Provider>;
    }),
    useGameState: () => {
        const context = React.useContext(Context);
        if (!context) {
            throw new Error('useGameState must be used within a GameStateProvider');
        }
        return context;
    }
};
