import type { Position } from './Position';
import type { CharacterMovement } from './CharacterMovement';

export type Character = {
    id: string;
    name?: string;
    sprite: string;
    position: Position;
    movement: CharacterMovement;
};
