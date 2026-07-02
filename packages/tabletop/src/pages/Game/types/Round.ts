import type { Turn } from './Turn';

export type Round = {
    turns: Turn[];
    currentTurnIndex: number;
};
