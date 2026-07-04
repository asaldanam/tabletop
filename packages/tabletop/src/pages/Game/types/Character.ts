import type { Position } from './Position';
import type { CharacterMovement } from './CharacterMovement';
import type { CharacterAction } from './CharacterAction';
import type { CharacterWounds } from './CharacterWounds';

export type Character = {
    actions: {
        list: CharacterAction[];
    };
    id: string;
    movement: CharacterMovement;
    name?: string;
    position: Position;
    sprite: string;
    wounds: CharacterWounds;
};
