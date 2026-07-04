import { memo } from 'react';

import { GameState } from '../../Game.state';

import { ActionPanel } from './components/ActionPanel';
import S from './Toolbar.module.css';
import { ToolbarTool } from './types/ToolbarTool';

const ICON_BASE = '/icons/000000/transparent/1x1';

export const Toolbar = memo(() => {
    const {
        actions: {
            cancelSelectedAction,
            confirmSelectedAction,
            endCurrentTurn,
            getActionConfirmation,
            getCharacterMovement,
            selectCurrentTurnCharacterAction,
            toggleCurrentTurnCharacterActions,
            toggleCurrentTurnCharacterMovement
        },
        state: { action, characters, rounds }
    } = GameState.useContext();

    const currentRound = rounds[0];
    const currentTurnCharacterId = currentRound?.turns[currentRound.currentTurnIndex]?.character.id ?? null;
    const currentTurnCharacter = characters.find((character) => character.id === currentTurnCharacterId) ?? null;
    const currentMovement = currentTurnCharacterId ? getCharacterMovement(currentTurnCharacterId) : null;
    const actionConfirmation = getActionConfirmation();

    const tools: ToolbarTool[] = [
        {
            id: 'movement',
            icon: `${ICON_BASE}/delapouite/move.svg`,
            label: 'Movimiento',
            isActive: currentMovement?.isActive ?? false,
            onPointerDown: toggleCurrentTurnCharacterMovement
        },
        {
            id: 'actions',
            hasContextPanel: true,
            icon: `${ICON_BASE}/lorc/crossed-swords.svg`,
            label: 'Acciones',
            isActive: action.isPanelOpen,
            onPointerDown: toggleCurrentTurnCharacterActions
        },
        {
            id: 'reactions',
            hasContextPanel: true,
            icon: `${ICON_BASE}/andymeneely/riposte.svg`,
            label: 'Reacciones',
            isDisabled: true
        },
        {
            id: 'endTurn',
            icon: `${ICON_BASE}/delapouite/player-next.svg`,
            label: 'Finalizar',
            onPointerDown: endCurrentTurn,
            variant: 'danger'
        }
    ];

    const activeTool = tools.find((tool) => tool.isActive);
    const activeLabel = activeTool?.label ?? '';
    const activeContextTool = activeTool?.hasContextPanel ? activeTool : null;

    return (
        <aside className={S.toolbar} aria-label="Herramientas del personaje activo">
            <div className={S.panel}>
                {activeContextTool && (
                    <div className={S.contextBar} aria-label={`${activeContextTool.label} disponibles`}>
                        {activeContextTool.id === 'actions' && (
                            <ActionPanel
                                character={currentTurnCharacter}
                                confirmation={actionConfirmation}
                                onCancel={cancelSelectedAction}
                                onConfirm={confirmSelectedAction}
                                onSelectAction={selectCurrentTurnCharacterAction}
                                selectedActionId={action.selected?.actionId ?? null}
                            />
                        )}
                    </div>
                )}

                <div
                    className={S.activeDivider}
                    aria-live="polite"
                    style={{
                        opacity: activeLabel ? 1 : 0,
                        transform: activeLabel ? 'translateY(0)' : 'translateY(50%)'
                    }}
                >
                    <span className={S.activeLine} aria-hidden="true" />
                    <span
                        className={S.activeLabel}
                        style={{
                            opacity: activeLabel ? 1 : 0
                        }}
                    >
                        {activeLabel ?? ''}
                    </span>
                    <span className={S.activeLine} aria-hidden="true" />
                </div>

                <div className={S.toolBar} role="group" aria-label="Herramientas de personaje">
                    {tools.map((tool) => (
                        <button
                            key={tool.id}
                            className={S.toolButton}
                            data-active={tool.isActive ? 'true' : undefined}
                            data-variant={tool.variant}
                            disabled={tool.isDisabled}
                            type="button"
                            aria-pressed={
                                tool.id === 'movement' || tool.id === 'actions' ? (tool.isActive ?? false) : undefined
                            }
                            onPointerDown={tool.onPointerDown}
                            title={tool.label}
                        >
                            <img className={S.toolIcon} src={tool.icon} alt="" draggable={false} aria-hidden="true" />
                            <span className={S.toolLabel}>{tool.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );
});

Toolbar.displayName = 'Toolbar';
