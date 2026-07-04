export type CharacterActionTarget = {
    range: number;
    type: 'character';
};

export type CharacterActionEffect = {
    type: 'damage';
    value: number;
};

export type CharacterAction = {
    description: string;
    effect: CharacterActionEffect;
    icon: {
        url: string;
    };
    id: string;
    name: string;
    target: CharacterActionTarget;
};
