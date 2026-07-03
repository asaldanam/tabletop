import { useCallback, type Dispatch, type SetStateAction } from 'react';

import type { State } from '../Game.state';

const setActiveMovementCharacter = (state: State, characterId: string): State['characters'] => {
    return state.characters.map((character) => ({
        ...character,
        movement: {
            ...character.movement,
            isActive: character.id === characterId
        }
    }));
};

type UseTurnActionsParams = {
    setState: Dispatch<SetStateAction<State>>;
};

export const useTurnActions = (params: UseTurnActionsParams) => {
    const { setState } = params;

    const endCurrentTurn = useCallback(() => {
        setState((currentState) => {
            const currentRound = currentState.rounds[0];
            if (!currentRound || currentRound.turns.length === 0) return currentState;

            const hasNextTurn = currentRound.currentTurnIndex < currentRound.turns.length - 1;
            if (hasNextTurn) {
                const nextTurnIndex = currentRound.currentTurnIndex + 1;
                const nextTurnCharacterId = currentRound.turns[nextTurnIndex]?.character.id;
                if (!nextTurnCharacterId) return currentState;

                return {
                    ...currentState,
                    characters: setActiveMovementCharacter(currentState, nextTurnCharacterId),
                    rounds: currentState.rounds.map((round, index) =>
                        index === 0
                            ? {
                                  ...round,
                                  currentTurnIndex: nextTurnIndex
                              }
                            : round
                    )
                };
            }

            const nextTurnCharacterId = currentRound.turns[0]?.character.id;
            if (!nextTurnCharacterId) return currentState;

            return {
                ...currentState,
                characters: setActiveMovementCharacter(currentState, nextTurnCharacterId),
                rounds: [
                    {
                        turns: currentRound.turns.map((turn) => ({ character: { ...turn.character } })),
                        currentTurnIndex: 0
                    },
                    ...currentState.rounds
                ]
            };
        });
    }, [setState]);

    return {
        endCurrentTurn
    };
};
