import { CSSProperties, memo } from 'react';
import { GAME_CONFIG } from '../../../../Game.config';
import { Character } from '../../../../Game.state';

import S from './TabletopCharacter.module.css';

const cell = GAME_CONFIG.map.cell;

type TabletopCharacterProps = {
    character: Character;
    direction: 'left' | 'right';
    isMoving: boolean;
    isSelected: boolean;
    onSelect: (characterId: string) => void;
};

export const TabletopCharacter = memo((props: TabletopCharacterProps) => {
    const { character, direction, isMoving, isSelected, onSelect } = props;

    console.log(character);

    return (
        <button
            className={S.box}
            aria-label={`Seleccionar personaje ${character.id}`}
            aria-pressed={isSelected}
            data-direction={direction}
            data-moving={isMoving}
            data-selected={isSelected}
            onClick={(event) => {
                event.stopPropagation();
                onSelect(character.id);
            }}
            style={
                {
                    '--cell-size': `${cell.size}px`,
                    transform: `translate3d(${(character.position.x - 1) * cell.size}px, ${(character.position.y - 1) * cell.size}px, 1px)`
                } as CSSProperties
            }
            type="button"
        >
            <div
                className={S.sprite}
                style={{
                    backgroundImage: `url(/${character.sprite})`
                }}
            />
        </button>
    );
});

TabletopCharacter.displayName = 'TabletopCharacter';
