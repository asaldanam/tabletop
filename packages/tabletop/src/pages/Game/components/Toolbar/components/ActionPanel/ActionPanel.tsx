import { memo } from 'react';

import type { Character, GameActionConfirmationView } from '../../../../types';

import S from './ActionPanel.module.css';

type ActionPanelProps = {
    character: Character | null;
    confirmation: GameActionConfirmationView | null;
    onCancel: () => void;
    onConfirm: () => void;
    onSelectAction: (actionId: string) => void;
    selectedActionId: string | null;
};

export const ActionPanel = memo((props: ActionPanelProps) => {
    const { character, confirmation, onCancel, onConfirm, onSelectAction, selectedActionId } = props;
    const actions = character?.actions.list ?? [];

    return (
        <div className={S.panel}>
            <div className={S.actionTrack} role="group" aria-label="Acciones disponibles">
                {actions.length > 0 ? (
                    actions.map((action) => {
                        const isSelected = selectedActionId === action.id;

                        return (
                            <button
                                key={action.id}
                                className={S.actionButton}
                                data-selected={isSelected ? 'true' : undefined}
                                type="button"
                                aria-pressed={isSelected}
                                onPointerDown={() => {
                                    onSelectAction(action.id);
                                }}
                                title={action.description}
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
                                <span className={S.actionCopy}>
                                    <span className={S.actionName}>{action.name}</span>
                                    <span className={S.actionMeta}>R{action.target.range} / D{action.effect.value}</span>
                                </span>
                            </button>
                        );
                    })
                ) : (
                    <span className={S.empty}>Sin acciones</span>
                )}
            </div>

            {confirmation && (
                <div className={S.confirmation} aria-live="polite">
                    <span className={S.confirmationText}>
                        {confirmation.actorName} usa {confirmation.action.name} contra {confirmation.targetName}
                    </span>
                    <span className={S.damageBadge}>+{confirmation.damage}</span>
                    <div className={S.confirmationActions}>
                        <button className={S.secondaryButton} type="button" onPointerDown={onCancel}>
                            Cancelar
                        </button>
                        <button className={S.primaryButton} type="button" onPointerDown={onConfirm}>
                            Confirmar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
});

ActionPanel.displayName = 'ActionPanel';
