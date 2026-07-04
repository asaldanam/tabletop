import { useCallback, useMemo, type Dispatch, type SetStateAction } from 'react';

import type { State } from '../Game.state';
import type {
    Character,
    CharacterAction,
    GameActionRangeCell,
    GameActionTargetingView,
    Position,
    Round
} from '../types';

const getCurrentTurnCharacterId = (rounds: Round[]) => {
    const currentRound = rounds[0];
    if (!currentRound) return null;

    return currentRound.turns[currentRound.currentTurnIndex]?.character.id ?? null;
};

const getCharacterById = (characters: Character[], characterId: string | null) => {
    if (!characterId) return null;

    return characters.find((character) => character.id === characterId) ?? null;
};

const getCharacterAction = (character: Character | null, actionId: string | null): CharacterAction | null => {
    if (!character || !actionId) return null;

    return character.actions.list.find((action) => action.id === actionId) ?? null;
};

const getChebyshevDistance = (from: Position, to: Position) => {
    return Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y));
};

const isCharacterInActionRange = (actor: Character | null, target: Character | null, action: CharacterAction | null) => {
    if (!actor || !target || !action) return false;
    if (actor.id === target.id) return false;

    const distance = getChebyshevDistance(actor.position, target.position);

    return distance > 0 && distance <= action.target.range;
};

const getActionContext = (state: State) => {
    const actor = getCharacterById(state.characters, state.action.selected?.actorCharacterId ?? null);
    const action = getCharacterAction(actor, state.action.selected?.actionId ?? null);

    return {
        action,
        actor
    };
};

type UseCharacterActionsParams = {
    setState: Dispatch<SetStateAction<State>>;
    state: State;
};

export const useCharacterActions = (params: UseCharacterActionsParams) => {
    const { setState, state } = params;

    const charactersById = useMemo(() => {
        return new globalThis.Map(state.characters.map((character) => [character.id, character]));
    }, [state.characters]);

    const toggleCurrentTurnCharacterActions = useCallback(() => {
        setState((currentState) => {
            const nextIsPanelOpen = !currentState.action.isPanelOpen;

            return {
                ...currentState,
                action: {
                    isPanelOpen: nextIsPanelOpen,
                    selected: nextIsPanelOpen ? currentState.action.selected : null
                },
                characters: currentState.characters.map((character) => ({
                    ...character,
                    movement: {
                        ...character.movement,
                        isActive: nextIsPanelOpen ? false : character.movement.isActive
                    }
                }))
            };
        });
    }, [setState]);

    const selectCurrentTurnCharacterAction = useCallback(
        (actionId: string) => {
            setState((currentState) => {
                const actorCharacterId = getCurrentTurnCharacterId(currentState.rounds);
                const actor = getCharacterById(currentState.characters, actorCharacterId);
                const action = getCharacterAction(actor, actionId);
                if (!actor || !action) return currentState;

                return {
                    ...currentState,
                    action: {
                        isPanelOpen: true,
                        selected: {
                            actionId: action.id,
                            actorCharacterId: actor.id
                        }
                    },
                    characters: currentState.characters.map((character) => ({
                        ...character,
                        movement: {
                            ...character.movement,
                            isActive: false
                        }
                    }))
                };
            });
        },
        [setState]
    );

    const selectActionTarget = useCallback(
        (characterId: string) => {
            setState((currentState) => {
                const { action, actor } = getActionContext(currentState);
                const target = getCharacterById(currentState.characters, characterId);
                const isValidTarget = isCharacterInActionRange(actor, target, action);
                if (!currentState.action.selected || !action || !target || !isValidTarget) return currentState;

                return {
                    ...currentState,
                    characters: currentState.characters.map((character) =>
                        character.id === target.id
                            ? {
                                  ...character,
                                  wounds: {
                                      ...character.wounds,
                                      current: character.wounds.current + action.effect.value
                                  }
                              }
                            : character
                    )
                };
            });
        },
        [setState]
    );

    const getActionTargeting = useCallback(
        (characterId: string): GameActionTargetingView => {
            const { action, actor } = getActionContext(state);
            const target = charactersById.get(characterId) ?? null;
            const isInRange = isCharacterInActionRange(actor, target, action);

            return {
                isInRange,
                isSelectedTarget: false,
                isTargetable: Boolean(state.action.isPanelOpen && state.action.selected && isInRange)
            };
        },
        [charactersById, state]
    );

    const getActionRangeCells = useCallback((): GameActionRangeCell[] => {
        const { action, actor } = getActionContext(state);
        if (!state.action.isPanelOpen || !state.action.selected || !actor || !action) return [];

        const rangeCells: GameActionRangeCell[] = [];

        for (let y = 1; y <= state.map.rows; y += 1) {
            for (let x = 1; x <= state.map.cols; x += 1) {
                const distance = getChebyshevDistance(actor.position, { x, y });
                if (distance > 0 && distance <= action.target.range) {
                    rangeCells.push({ x, y });
                }
            }
        }

        return rangeCells;
    }, [state]);

    return {
        getActionRangeCells,
        getActionTargeting,
        selectActionTarget,
        selectCurrentTurnCharacterAction,
        toggleCurrentTurnCharacterActions
    };
};
