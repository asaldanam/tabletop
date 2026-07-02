import { CSSProperties, memo, useMemo } from 'react';

import { GameState } from '../../Game.state';
import type { Character } from '../../types';

import S from './Round.module.css';

type RoundProps = {};

type TurnView = {
    character: Character | null;
    id: string;
    label: string;
    phase: 'past' | 'active' | 'next';
};

export const Round = memo((props: RoundProps) => {
    const {
        state: { characters, rounds }
    } = GameState.useContext();

    const currentRound = rounds[0];

    const turns = useMemo<TurnView[]>(() => {
        if (!currentRound) return [];

        const charactersById = new globalThis.Map(characters.map((character) => [character.id, character]));

        return currentRound.turns.map((turn, index) => {
            const character = charactersById.get(turn.character.id) ?? null;
            const label = character?.name ?? `Personaje ${turn.character.id}`;

            return {
                character,
                id: `${turn.character.id}-${index}`,
                label,
                phase: index < currentRound.currentTurnIndex ? 'past' : index === currentRound.currentTurnIndex ? 'active' : 'next'
            };
        });
    }, [characters, currentRound]);

    if (!currentRound || turns.length === 0) return null;

    return (
        <aside className={S.round} aria-label="Orden de turnos de la ronda actual">
            <div className={S.panel}>
                <ol className={S.track}>
                    {turns.map((turn) => {
                        const isActive = turn.phase === 'active';

                        return (
                            <li key={turn.id} className={S.turn} data-phase={turn.phase} aria-current={isActive ? 'step' : undefined}>
                                <span className={S.portrait} aria-label={isActive ? `${turn.label}: turno activo` : turn.label}>
                                    {turn.character ? (
                                        <span
                                            className={S.sprite}
                                            aria-hidden="true"
                                            style={
                                                {
                                                    backgroundImage: `url(/${turn.character.sprite})`
                                                } as CSSProperties
                                            }
                                        />
                                    ) : (
                                        <span className={S.missing} aria-hidden="true">
                                            ?
                                        </span>
                                    )}
                                </span>
                                <span className={S.name}>{turn.label}</span>
                            </li>
                        );
                    })}
                </ol>
            </div>
        </aside>
    );
});

Round.displayName = 'Round';
