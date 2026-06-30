import { memo } from 'react';

import { TabletopCamera } from './components/TabletopCamera';
import S from './Tabletop.module.css';
import { GameState } from '../../Game.state';
import { GAME_CONFIG } from '../../Game.config';
import { TabletopCharacter, useTabletopCharacterMovement } from './components/TabletopCharacter';

const cell = GAME_CONFIG.map.cell;

type TabletopProps = {};

export const Tabletop = memo((props: TabletopProps) => {
    const [{ map, characters }] = GameState.useContext();
    const { getCharacterMovement, moveSelectedCharacterTo, selectCharacter } = useTabletopCharacterMovement({
        characters
    });

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
                            gridTemplate: `repeat(${map.rows}, ${cell.size}px) / repeat(${map.cols}, ${cell.size}px)`,
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
                        {[...Array(map.rows * map.cols)].map((_, index) => {
                            const x = (index % map.cols) + 1;
                            const y = Math.floor(index / map.cols) + 1;
                            const name = `(${x}, ${y})`;

                            return (
                                <button
                                    key={index}
                                    aria-label={`Casilla ${name}`}
                                    className={S.cell}
                                    onClick={() => moveSelectedCharacterTo({ x, y })}
                                    type="button"
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </TabletopCamera>
    );
});

Tabletop.displayName = 'Tabletop';
