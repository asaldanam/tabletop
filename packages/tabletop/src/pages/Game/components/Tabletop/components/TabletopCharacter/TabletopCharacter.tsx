import { CSSProperties, memo } from 'react';
import { GAME_CONFIG } from '../../../../Game.config';
import type { Character, CharacterDirection } from '../../../../types';

import { TabletopCharacterPin } from './components/TabletopCharacterPin';
import { TabletopCharacterShadow } from './components/TabletopCharacterShadow';
import S from './TabletopCharacter.module.css';

const cell = GAME_CONFIG.map.cell;

type TabletopCharacterProps = {
    character: Character;
    direction: CharacterDirection;
    isMoving: boolean;
    isSelected: boolean;
};

export const TabletopCharacter = memo((props: TabletopCharacterProps) => {
    const { character, direction, isMoving, isSelected } = props;
    const animation = isMoving ? `running-${direction}` : 'idle';

    return (
        <div
            className={S.box}
            aria-label={`Personaje ${character.id}`}
            data-tabletop-character-id={character.id}
            data-direction={direction}
            data-animation={animation}
            data-moving={isMoving}
            data-selected={isSelected}
            style={
                {
                    '--cell-size': `${cell.size}px`,
                    transform: `translate3d(${(character.position.x - 1) * cell.size}px, ${(character.position.y - 1) * cell.size}px, 1px)`
                } as CSSProperties
            }
        >
            {isSelected ? <TabletopCharacterShadow /> : null}
            <div
                className={S.sprite}
                style={{
                    backgroundImage: `url(/${character.sprite})`
                }}
            />
            {isSelected ? <TabletopCharacterPin /> : null}
        </div>
    );
});

TabletopCharacter.displayName = 'TabletopCharacter';
