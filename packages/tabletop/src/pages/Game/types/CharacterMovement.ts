export type CharacterDirection = 'left' | 'right';

export type CharacterMovement = {
    direction: CharacterDirection;
    isMoving: boolean;
};

export type CharacterMovementView = CharacterMovement & {
    isSelected: boolean;
};

export type CharacterMovementById = Record<string, CharacterMovement>;
