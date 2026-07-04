import type { Position } from './Position';

export type GameActionSelection = {
    actionId: string;
    actorCharacterId: string;
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

export type GameActionRangeCell = Position;
