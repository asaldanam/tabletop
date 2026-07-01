import React, { createContext, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
    Character,
    CharacterMovement,
    CharacterMovementById,
    CharacterMovementView,
    Map,
    Position
} from './types';

export type State = {
    map: Map;
    characters: Character[];
    selectedCharacterId: string | null;
    movementByCharacterId: CharacterMovementById;
};

export type Actions = {
    getCharacterMovement: (characterId: string) => CharacterMovementView;
    moveSelectedCharacterTo: (position: Position) => void;
    selectCharacter: (characterId: string) => void;
};

const STEP_DELAY_MS = 220;

const createStraightPath = (from: Position, to: Position) => {
    const path: Position[] = [];
    let x = from.x;
    let y = from.y;

    while (x !== to.x || y !== to.y) {
        x += Math.sign(to.x - x);
        y += Math.sign(to.y - y);
        path.push({ x, y });
    }

    return path;
};

const getMovementDirection = (from: Position, to: Position): CharacterMovement['direction'] => {
    const stepX = Math.sign(to.x - from.x);
    const stepY = Math.sign(to.y - from.y);

    return stepX - stepY >= 0 ? 'right' : 'left';
};

const Context = createContext<{ actions: Actions; state: State } | null>(null);

export const GameState = {
    Provider: memo((props: { children: React.ReactNode }) => {
        const [state, setState] = useState<State>({
            map: {
                image: 'map.jpg',
                rows: 40,
                cols: 40
            },
            characters: [
                {
                    id: '1',
                    sprite: 'agumon.webp',
                    position: {
                        x: 18,
                        y: 12
                    }
                },
                {
                    id: '2',
                    sprite: 'tentomon.webp',
                    position: {
                        x: 17,
                        y: 12
                    }
                }
            ],
            movementByCharacterId: {},
            selectedCharacterId: null
        });
        const movementTimeouts = useRef<Record<string, number>>({});

        const charactersById = useMemo(() => {
            return new globalThis.Map(state.characters.map((character) => [character.id, character]));
        }, [state.characters]);

        const clearMovementTimeout = useCallback((characterId: string) => {
            const timeout = movementTimeouts.current[characterId];
            if (!timeout) return;

            window.clearTimeout(timeout);
            delete movementTimeouts.current[characterId];
        }, []);

        const updateCharacterPosition = useCallback((characterId: string, position: Position) => {
            setState((currentState) => ({
                ...currentState,
                characters: currentState.characters.map((character) =>
                    character.id === characterId ? { ...character, position } : character
                )
            }));
        }, []);

        const setMovement = useCallback((characterId: string, movement: Partial<CharacterMovement>) => {
            setState((currentState) => {
                const currentMovement = currentState.movementByCharacterId[characterId];

                return {
                    ...currentState,
                    movementByCharacterId: {
                        ...currentState.movementByCharacterId,
                        [characterId]: {
                            direction: currentMovement?.direction ?? 'right',
                            isMoving: currentMovement?.isMoving ?? false,
                            ...movement
                        }
                    }
                };
            });
        }, []);

        const selectCharacter = useCallback((characterId: string) => {
            setState((currentState) => ({
                ...currentState,
                selectedCharacterId: characterId
            }));
        }, []);

        const moveSelectedCharacterTo = useCallback(
            (position: Position) => {
                const selectedCharacterId = state.selectedCharacterId;
                if (!selectedCharacterId) return;

                const selectedCharacter = charactersById.get(selectedCharacterId);
                if (!selectedCharacter) return;

                clearMovementTimeout(selectedCharacterId);

                const path = createStraightPath(selectedCharacter.position, position);
                if (path.length === 0) return;

                const direction = getMovementDirection(selectedCharacter.position, path[0]);

                setMovement(selectedCharacterId, {
                    direction,
                    isMoving: true
                });

                const moveStep = (stepIndex: number) => {
                    const nextPosition = path[stepIndex];
                    if (!nextPosition) {
                        setMovement(selectedCharacterId, { isMoving: false });
                        delete movementTimeouts.current[selectedCharacterId];
                        return;
                    }

                    updateCharacterPosition(selectedCharacterId, nextPosition);

                    movementTimeouts.current[selectedCharacterId] = window.setTimeout(() => {
                        moveStep(stepIndex + 1);
                    }, STEP_DELAY_MS);
                };

                moveStep(0);
            },
            [charactersById, clearMovementTimeout, setMovement, state.selectedCharacterId, updateCharacterPosition]
        );

        const getCharacterMovement = useCallback(
            (characterId: string): CharacterMovementView => ({
                direction: state.movementByCharacterId[characterId]?.direction ?? 'right',
                isMoving: state.movementByCharacterId[characterId]?.isMoving ?? false,
                isSelected: state.selectedCharacterId === characterId
            }),
            [state.movementByCharacterId, state.selectedCharacterId]
        );

        const actions = useMemo(
            (): Actions => ({
                getCharacterMovement,
                moveSelectedCharacterTo,
                selectCharacter
            }),
            [getCharacterMovement, moveSelectedCharacterTo, selectCharacter]
        );

        useEffect(() => {
            return () => {
                for (const timeout of Object.values(movementTimeouts.current)) {
                    window.clearTimeout(timeout);
                }
            };
        }, []);

        return <Context.Provider value={{ actions, state }}>{props.children}</Context.Provider>;
    }),
    useContext: () => {
        const context = React.useContext(Context);
        if (!context) throw new Error('GameState context is not available');
        return context;
    }
};
