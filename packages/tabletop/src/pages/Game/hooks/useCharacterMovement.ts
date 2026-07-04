import { useCallback, useEffect, useMemo, useRef, type Dispatch, type SetStateAction } from 'react';

import type { State } from '../Game.state';
import type { CharacterMovement, CharacterMovementView, Position, Round } from '../types';

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

type UseCharacterMovementParams = {
    setState: Dispatch<SetStateAction<State>>;
    state: State;
};

export const useCharacterMovement = (params: UseCharacterMovementParams) => {
    const { setState, state } = params;

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

    const updateCharacterPosition = useCallback(
        (characterId: string, position: Position) => {
            setState((currentState) => ({
                ...currentState,
                characters: currentState.characters.map((character) =>
                    character.id === characterId ? { ...character, position } : character
                )
            }));
        },
        [setState]
    );

    const setMovement = useCallback(
        (characterId: string, movement: Partial<CharacterMovement>) => {
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
        },
        [setState]
    );

    const toggleCurrentTurnCharacterMovement = useCallback(() => {
        setState((currentState) => {
            const currentTurnCharacterId = getCurrentTurnCharacterId(currentState.rounds);
            if (!currentTurnCharacterId) return currentState;

            return {
                ...currentState,
                action: {
                    isPanelOpen: false,
                    selected: null
                },
                characters: currentState.characters.map((character) => ({
                    ...character,
                    movement: {
                        ...character.movement,
                        isActive: character.id === currentTurnCharacterId ? !character.movement.isActive : false
                    }
                }))
            };
        });
    }, [setState]);

    const moveSelectedCharacterTo = useCallback(
        (position: Position) => {
            const currentTurnCharacterId = getCurrentTurnCharacterId(state.rounds);
            if (!currentTurnCharacterId) return;

            const currentTurnCharacter = charactersById.get(currentTurnCharacterId);
            if (!currentTurnCharacter) return;
            if (!currentTurnCharacter.movement.isActive) return;

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
                isActive: character?.movement.isActive ?? false,
                isMoving: character?.movement.isMoving ?? false,
                isSelected: getCurrentTurnCharacterId(state.rounds) === characterId
            };
        },
        [charactersById, state.rounds]
    );

    useEffect(() => {
        return () => {
            for (const timeout of Object.values(movementTimeouts.current)) {
                window.clearTimeout(timeout);
            }
        };
    }, []);

    return {
        getCharacterMovement,
        moveSelectedCharacterTo,
        toggleCurrentTurnCharacterMovement
    };
};
