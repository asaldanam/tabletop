export type CharacterDirection = 'left' | 'right';

export type CharacterMovement = {
    direction: CharacterDirection | undefined;
    isActive: boolean;
    isMoving: boolean;
};

export type CharacterMovementView = Omit<CharacterMovement, 'direction'> & {
    direction: CharacterDirection;
    isSelected: boolean;
};
