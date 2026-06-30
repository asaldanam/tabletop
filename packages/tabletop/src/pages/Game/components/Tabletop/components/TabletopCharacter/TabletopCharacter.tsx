import { memo } from 'react';
import { GAME_CONFIG } from '../../../../Game.config';
import { Character } from '../../../../Game.state';

import S from './TabletopCharacter.module.css';

const cell = GAME_CONFIG.map.cell;

type TabletopCharacterProps = {
    character: Character;
};

export const TabletopCharacter = memo((props: TabletopCharacterProps) => {
    const { character } = props;

    return (
        <>
            <input
                className={S.character}
                type="checkbox"
                style={{
                    width: `${cell.size}px`,
                    height: `${cell.size}px`,
                    transform: `translate3d(${(character.position.x - 1) * cell.size}px, ${(character.position.y - 1) * cell.size}px, 1px)`
                }}
            />
        </>
    );
});

TabletopCharacter.displayName = 'TabletopCharacter';
