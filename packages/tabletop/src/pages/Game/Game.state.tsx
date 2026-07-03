import React, { createContext, memo, useMemo, useState } from 'react';

import { useTurnActions } from './hooks/useTurnActions';
import { useCharacterMovement } from './hooks/useCharacterMovement';
import type { Character, CharacterMovementView, Map, Position, Round } from './types';

export type State = {
    map: Map;
    characters: Character[];
    rounds: Round[];
};

export type Actions = {
    endCurrentTurn: () => void;
    getCharacterMovement: (characterId: string) => CharacterMovementView;
    moveSelectedCharacterTo: (position: Position) => void;
    toggleCurrentTurnCharacterMovement: () => void;
};

const Context = createContext<{ actions: Actions; state: State } | null>(null);

export const GameState = {
    Provider: memo((props: { children: React.ReactNode }) => {
        // State
        // El estado de gestiona de forma global para todo el Game

        const [state, setState] = useState<State>({
            map: {
                image: {
                    url: 'sauna-1-[22x22].jpg'
                },
                rows: 22,
                cols: 22
            },
            characters: [
                {
                    id: '1',
                    name: 'Arthur',
                    sprite: 'arthur.webp',
                    position: {
                        x: 1,
                        y: 1
                    },
                    movement: {
                        direction: undefined,
                        isActive: true,
                        isMoving: false
                    }
                },
                {
                    id: '2',
                    name: 'Pangu',
                    sprite: 'pangu.webp',
                    position: {
                        x: 2,
                        y: 1
                    },
                    movement: {
                        direction: undefined,
                        isActive: false,
                        isMoving: false
                    }
                },
                {
                    id: '3',
                    name: 'Agumon',
                    sprite: 'agumon.webp',
                    position: {
                        x: 1,
                        y: 2
                    },
                    movement: {
                        direction: undefined,
                        isActive: false,
                        isMoving: false
                    }
                },
                {
                    id: '4',
                    name: 'Tentomon',
                    sprite: 'tentomon.webp',
                    position: {
                        x: 2,
                        y: 2
                    },
                    movement: {
                        direction: undefined,
                        isActive: false,
                        isMoving: false
                    }
                },
                {
                    id: '5',
                    name: 'Alexander',
                    sprite: 'alexander.webp',
                    position: {
                        x: 3,
                        y: 1
                    },
                    movement: {
                        direction: undefined,
                        isActive: false,
                        isMoving: false
                    }
                },
                {
                    id: '6',
                    name: 'Black Mage',
                    sprite: 'black-mage.webp',
                    position: {
                        x: 4,
                        y: 1
                    },
                    movement: {
                        direction: undefined,
                        isActive: false,
                        isMoving: false
                    }
                },
                {
                    id: '7',
                    name: 'Goku',
                    sprite: 'goku.webp',
                    position: {
                        x: 3,
                        y: 2
                    },
                    movement: {
                        direction: undefined,
                        isActive: false,
                        isMoving: false
                    }
                },
                {
                    id: '8',
                    name: 'Sinchan',
                    sprite: 'sinchan.webp',
                    position: {
                        x: 4,
                        y: 2
                    },
                    movement: {
                        direction: undefined,
                        isActive: false,
                        isMoving: false
                    }
                }
            ],
            rounds: [
                {
                    turns: [
                        { character: { id: '1' } },
                        { character: { id: '2' } },
                        { character: { id: '3' } },
                        { character: { id: '4' } },
                        { character: { id: '5' } },
                        { character: { id: '6' } },
                        { character: { id: '7' } },
                        { character: { id: '8' } }
                    ],
                    currentTurnIndex: 0
                }
            ]
        });

        // Actions
        // Las acciones deben ir en un custom hook independiente para separar responsabilidad y evitar que el provider se vuelva demasiado grande.

        const { getCharacterMovement, moveSelectedCharacterTo, toggleCurrentTurnCharacterMovement } =
            useCharacterMovement({
                state,
                setState
            });
        const { endCurrentTurn } = useTurnActions({ setState });

        return (
            <Context.Provider
                value={{
                    state,
                    actions: useMemo(
                        (): Actions => ({
                            endCurrentTurn,
                            getCharacterMovement,
                            moveSelectedCharacterTo,
                            toggleCurrentTurnCharacterMovement
                        }),
                        [
                            endCurrentTurn,
                            getCharacterMovement,
                            moveSelectedCharacterTo,
                            toggleCurrentTurnCharacterMovement
                        ]
                    )
                }}
            >
                {props.children}
            </Context.Provider>
        );
    }),
    useContext: () => {
        const context = React.useContext(Context);
        if (!context) throw new Error('GameState context is not available');
        return context;
    }
};
