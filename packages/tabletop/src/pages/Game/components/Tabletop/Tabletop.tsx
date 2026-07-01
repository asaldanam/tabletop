import { memo } from 'react';

import { TabletopBoardSurface } from './components/TabletopBoardSurface';
import { TabletopCamera } from './components/TabletopCamera';
import S from './Tabletop.module.css';
import { GameState } from '../../Game.state';
import { GAME_CONFIG } from '../../Game.config';
import { TabletopCharacter } from './components/TabletopCharacter';

const cell = GAME_CONFIG.map.cell;

type TabletopProps = {};

export const Tabletop = memo((props: TabletopProps) => {
    const {
        actions: { getCharacterMovement, moveSelectedCharacterTo, selectCharacter },
        state: { map, characters }
    } = GameState.useContext();

    const width = map.cols * cell.size;
    const height = map.rows * cell.size;
    const projectedWidth = (width + height) / Math.SQRT2;
    const projectedHeight = projectedWidth / 2;

    return (
        <TabletopCamera>
            <div className={S.isoBounds} style={{ width: `${projectedWidth}px`, height: `${projectedHeight}px` }}>
                <div
                    className={S.isoLayer}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        left: `${(projectedWidth - width) / 2}px`,
                        top: `${(projectedHeight - height) / 2}px`
                    }}
                >
                    <div
                        className={S.grid}
                        style={{
                            width: `${width}px`,
                            height: `${height}px`
                        }}
                    >
                        {characters.map((character) => {
                            const movement = getCharacterMovement(character.id);

                            return (
                                <TabletopCharacter
                                    key={character.id}
                                    character={character}
                                    direction={movement.direction}
                                    isMoving={movement.isMoving}
                                    isSelected={movement.isSelected}
                                    onSelect={selectCharacter}
                                />
                            );
                        })}
                        <TabletopBoardSurface
                            cellSize={cell.size}
                            cols={map.cols}
                            onCellClick={(position) => {
                                moveSelectedCharacterTo(position);
                                selectCharacter('');
                            }}
                            rows={map.rows}
                        />
                    </div>
                </div>
            </div>
        </TabletopCamera>
    );
});

Tabletop.displayName = 'Tabletop';
