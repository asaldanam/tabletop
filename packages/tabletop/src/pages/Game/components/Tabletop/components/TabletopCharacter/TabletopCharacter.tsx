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
        actions: { getActionTargeting, selectActionTarget },
        state: { rounds }
    } = GameState.useContext();
    const round = rounds[0];
    const turn = round?.turns[round.currentTurnIndex];
    const isCharacterTurn = turn?.character.id === character.id;
    const targeting = getActionTargeting(character.id);
    const hasWounds = character.wounds.current > 0;

    const animation = movement.isMoving ? `running-${movement.direction}` : 'idle';

    return (
        <button
            className={S.box}
            aria-label={`Personaje ${character.id}`}
            data-tabletop-character-id={character.id}
            data-direction={movement.direction}
            data-animation={animation}
            data-in-range={targeting.isInRange}
            data-moving={movement.isMoving}
            data-selected={movement.isActive}
            data-target-selected={targeting.isSelectedTarget}
            data-targetable={targeting.isTargetable}
            disabled={!targeting.isTargetable}
            type="button"
            onPointerDown={() => {
                selectActionTarget(character.id);
            }}
            style={
                {
                    '--cell-size': `${cell.size}px`,
                    transform: `translate3d(${(character.position.x - 1) * cell.size}px, ${(character.position.y - 1) * cell.size}px, 1px)`
                } as CSSProperties
            }
        >
            <TabletopCharacterShadow show={movement.isActive || targeting.isSelectedTarget} />
            <div
                className={S.sprite}
                style={{
                    backgroundImage: `url(/${character.sprite})`
                }}
            />
            {hasWounds ? <span className={S.woundBadge}>+{character.wounds.current}</span> : null}
            {isCharacterTurn ? <TabletopCharacterPin /> : null}
        </button>
    );
});

TabletopCharacter.displayName = 'TabletopCharacter';
