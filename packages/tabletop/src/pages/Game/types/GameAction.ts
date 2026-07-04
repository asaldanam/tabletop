import type { CharacterAction } from './CharacterAction';
import type { Position } from './Position';

export type GameActionSelection = {
    actionId: string;
    actorCharacterId: string;
    targetCharacterId: string | null;
};

export type GameActionState = {
    isPanelOpen: boolean;
    selected: GameActionSelection | null;
};

export type GameActionTargetingView = {
    isInRange: boolean;
    isSelectedTarget: boolean;
    isTargetable: boolean;
};

export type GameActionConfirmationView = {
    action: CharacterAction;
    actorName: string;
    damage: number;
    targetName: string;
};

export type GameActionRangeCell = Position;
