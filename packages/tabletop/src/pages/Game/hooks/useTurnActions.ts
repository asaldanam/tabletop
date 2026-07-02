import { useCallback, type Dispatch, type SetStateAction } from 'react';

import type { State } from '../Game.state';

type UseTurnActionsParams = {
    setState: Dispatch<SetStateAction<State>>;
};

export const useTurnActions = (params: UseTurnActionsParams) => {
    const { setState } = params;

    const endCurrentTurn = useCallback(() => {
        setState((currentState) => {
            const currentRound = currentState.rounds[0];
            if (!currentRound || currentRound.turns.length === 0) return currentState;

            const characters = currentState.characters.map((character) => ({
                ...character,
                movement: {
                    ...character.movement,
                    isActive: false
                }
            }));

            const hasNextTurn = currentRound.currentTurnIndex < currentRound.turns.length - 1;
            if (hasNextTurn) {
                return {
                    ...currentState,
                    characters,
                    rounds: currentState.rounds.map((round, index) =>
                        index === 0
                            ? {
                                  ...round,
                                  currentTurnIndex: round.currentTurnIndex + 1
                              }
                            : round
                    )
                };
            }

            return {
                ...currentState,
                characters,
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
