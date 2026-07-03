import { CSSProperties, memo } from 'react';
import { GAME_CONFIG } from '../../../../Game.config';
import type { Character } from '../../../../types';

import { GameState } from '../../../../Game.state';
import { TabletopCharacterPin } from './components/TabletopCharacterPin';
import { TabletopCharacterShadow } from './components/TabletopCharacterShadow';
import S from './TabletopCharacter.module.css';

const cell = GAME_CONFIG.map.cell;

type TabletopCharacterProps = {
    character: Character;
};

export const TabletopCharacter = memo((props: TabletopCharacterProps) => {
    const { character } = props;
    const { movement } = character;

    const {
        state: { rounds, map }
    } = GameState.useContext();
    const round = rounds[0];
    const turn = round.turns[round.currentTurnIndex];
    const isCharacterTurn = turn.character.id === character.id;

    const animation = movement.isMoving ? `running-${movement.direction}` : 'idle';

    return (
        <div
            className={S.box}
            aria-label={`Personaje ${character.id}`}
            data-tabletop-character-id={character.id}
            data-direction={movement.direction}
            data-animation={animation}
            data-moving={movement.isMoving}
            data-selected={movement.isActive}
            style={
                {
                    '--cell-size': `${cell.size}px`,
                    transform: `translate3d(${(character.position.x - 1) * cell.size}px, ${(character.position.y - 1) * cell.size}px, 1px)`
                } as CSSProperties
            }
        >
            {movement.isActive ? <TabletopCharacterShadow /> : null}
            <div
                className={S.sprite}
                style={{
                    backgroundImage: `url(/${character.sprite})`
                }}
            />
            {isCharacterTurn ? <TabletopCharacterPin /> : null}
        </div>
    );
});

TabletopCharacter.displayName = 'TabletopCharacter';
