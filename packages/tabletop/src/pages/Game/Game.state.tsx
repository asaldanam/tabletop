import React, { createContext, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type {
    Character,
    CharacterMovement,
    CharacterMovementView,
    Map,
    Position,
    Round
} from './types';

export type State = {
    map: Map;
    characters: Character[];
    rounds: Round[];
};

export type Actions = {
    getCharacterMovement: (characterId: string) => CharacterMovementView;
    moveSelectedCharacterTo: (position: Position) => void;
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

const getCurrentTurnCharacterId = (rounds: Round[]) => {
    const currentRound = rounds[0];
    if (!currentRound) return null;

    return currentRound.turns[currentRound.currentTurnIndex]?.character.id ?? null;
};

const Context = createContext<{ actions: Actions; state: State } | null>(null);

export const GameState = {
    Provider: memo((props: { children: React.ReactNode }) => {
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
                    sprite: 'arthur.webp',
                    position: {
                        x: 1,
                        y: 1
                    },
                    movement: {
                        direction: undefined,
                        isMoving: false
                    }
                },
                {
                    id: '2',
                    sprite: 'pangu.webp',
                    position: {
                        x: 2,
                        y: 1
                    },
                    movement: {
                        direction: undefined,
                        isMoving: false
                    }
                }
            ],
            rounds: [
                {
                    turns: [{ character: { id: '1' } }, { character: { id: '2' } }],
                    currentTurnIndex: 0
                }
            ]
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
                return {
                    ...currentState,
                    characters: currentState.characters.map((character) =>
                        character.id === characterId
                            ? {
                                  ...character,
                                  movement: {
                                      ...character.movement,
                                      ...movement
                                  }
                              }
                            : character
                    )
                };
            });
        }, []);

        const moveSelectedCharacterTo = useCallback(
            (position: Position) => {
                const currentTurnCharacterId = getCurrentTurnCharacterId(state.rounds);
                if (!currentTurnCharacterId) return;

                const currentTurnCharacter = charactersById.get(currentTurnCharacterId);
                if (!currentTurnCharacter) return;

                clearMovementTimeout(currentTurnCharacterId);

                const path = createStraightPath(currentTurnCharacter.position, position);
                if (path.length === 0) return;

                const direction = getMovementDirection(currentTurnCharacter.position, path[0]);

                setMovement(currentTurnCharacterId, {
                    direction,
                    isMoving: true
                });

                const moveStep = (stepIndex: number) => {
                    const nextPosition = path[stepIndex];
                    if (!nextPosition) return;

                    updateCharacterPosition(currentTurnCharacterId, nextPosition);

                    if (stepIndex === path.length - 1) {
                        movementTimeouts.current[currentTurnCharacterId] = window.setTimeout(() => {
                            setMovement(currentTurnCharacterId, { isMoving: false });
                            delete movementTimeouts.current[currentTurnCharacterId];
                        }, STEP_DELAY_MS);
                        return;
                    }

                    movementTimeouts.current[currentTurnCharacterId] = window.setTimeout(() => {
                        moveStep(stepIndex + 1);
                    }, STEP_DELAY_MS);
                };

                moveStep(0);
            },
            [charactersById, clearMovementTimeout, setMovement, state.rounds, updateCharacterPosition]
        );

        const getCharacterMovement = useCallback(
            (characterId: string): CharacterMovementView => {
                const character = charactersById.get(characterId);

                return {
                    direction: character?.movement.direction ?? 'right',
                    isMoving: character?.movement.isMoving ?? false,
                    isSelected: getCurrentTurnCharacterId(state.rounds) === characterId
                };
            },
            [charactersById, state.rounds]
        );

        const actions = useMemo(
            (): Actions => ({
                getCharacterMovement,
                moveSelectedCharacterTo
            }),
            [getCharacterMovement, moveSelectedCharacterTo]
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
