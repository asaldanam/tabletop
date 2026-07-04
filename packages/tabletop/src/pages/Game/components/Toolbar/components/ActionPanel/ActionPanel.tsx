import { memo } from 'react';

import type { Character } from '../../../../types';

import S from './ActionPanel.module.css';

type ActionPanelProps = {
    character: Character | null;
    onSelectAction: (actionId: string) => void;
    selectedActionId: string | null;
};

export const ActionPanel = memo((props: ActionPanelProps) => {
    const { character, onSelectAction, selectedActionId } = props;
    const actions = character?.actions.list ?? [];
    const selectedAction = actions.find((action) => action.id === selectedActionId) ?? null;

    return (
        <div className={S.panel}>
            {selectedAction && (
                <div className={S.actionTooltip} id={`action-tooltip-${selectedAction.id}`} role="tooltip">
                    <span className={S.tooltipTitle}>{selectedAction.name}</span>
                    <span className={S.tooltipDescription}>{selectedAction.description}</span>
                    <span className={S.tooltipMeta}>
                        Alcance {selectedAction.target.range} <span aria-hidden="true">/</span> Daño{' '}
                        {selectedAction.effect.value}
                    </span>
                </div>
            )}

            <div className={S.actionTrack} role="group" aria-label="Acciones disponibles">
                {actions.length > 0 ? (
                    actions.map((action) => {
                        const isSelected = selectedActionId === action.id;
                        const describedBy = isSelected ? `action-tooltip-${action.id}` : undefined;

                        return (
                            <button
                                key={action.id}
                                className={S.actionButton}
                                data-selected={isSelected ? 'true' : undefined}
                                type="button"
                                aria-label={`${action.name}: ${action.description} Alcance ${action.target.range}. Daño ${action.effect.value}.`}
                                aria-pressed={isSelected}
                                aria-describedby={describedBy}
                                onPointerDown={() => {
                                    onSelectAction(action.id);
                                }}
                            >
                                <span className={S.actionIconFrame}>
                                    <img
                                        className={S.actionIcon}
                                        src={action.icon.url}
                                        alt=""
                                        draggable={false}
                                        aria-hidden="true"
                                    />
                                </span>
                                <span className={S.actionLabel}>{action.name}</span>
                            </button>
                        );
                    })
                ) : (
                    <span className={S.empty}>Sin acciones</span>
                )}
            </div>
        </div>
    );
});

ActionPanel.displayName = 'ActionPanel';
