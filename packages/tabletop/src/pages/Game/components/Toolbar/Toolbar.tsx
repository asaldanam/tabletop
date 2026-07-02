import { memo } from 'react';

import { GameState } from '../../Game.state';

import S from './Toolbar.module.css';

type ToolbarProps = {};

type Tool = {
    isActive?: boolean;
    isDisabled?: boolean;
    label: string;
    onClick?: () => void;
};

export const Toolbar = memo((props: ToolbarProps) => {
    const {
        actions: { endCurrentTurn, getCharacterMovement, toggleCurrentTurnCharacterMovement },
        state: { rounds }
    } = GameState.useContext();

    const currentRound = rounds[0];
    const currentTurnCharacterId = currentRound?.turns[currentRound.currentTurnIndex]?.character.id ?? null;
    const currentMovement = currentTurnCharacterId ? getCharacterMovement(currentTurnCharacterId) : null;

    const tools: Tool[] = [
        {
            label: 'Movimiento',
            isActive: currentMovement?.isActive ?? false,
            onClick: toggleCurrentTurnCharacterMovement
        },
        {
            label: 'Acciones',
            isDisabled: true
        },
        {
            label: 'Reacciones',
            isDisabled: true
        }
    ];

    return (
        <aside className={S.toolbar} aria-label="Herramientas del personaje activo">
            <div className={S.panel}>
                <div className={S.toolGroup} role="group" aria-label="Herramientas de personaje">
                    {tools.map((tool) => (
                        <button
                            key={tool.label}
                            className={S.toolButton}
                            data-active={tool.isActive ? 'true' : undefined}
                            disabled={tool.isDisabled}
                            type="button"
                            aria-pressed={tool.isDisabled ? undefined : (tool.isActive ?? false)}
                            onClick={tool.onClick}
                        >
                            <span className={S.toolIcon} aria-hidden="true">
                                {tool.label.slice(0, 1)}
                            </span>
                            <span className={S.toolLabel}>{tool.label}</span>
                        </button>
                    ))}
                </div>
                <div className={S.separator} aria-hidden="true" />
                <button className={S.endTurnButton} type="button" onClick={endCurrentTurn}>
                    Finalizar turno
                </button>
            </div>
        </aside>
    );
});

Toolbar.displayName = 'Toolbar';
