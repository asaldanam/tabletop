export type CharacterDirection = 'left' | 'right';

export type CharacterMovement = {
    direction: CharacterDirection | undefined;
    isMoving: boolean;
};

export type CharacterMovementView = Omit<CharacterMovement, 'direction'> & {
    direction: CharacterDirection;
    isSelected: boolean;
};
