import { memo } from 'react';

import { TabletopCamera } from './components/TabletopCamera';
import S from './Tabletop.module.css';
import { GameState } from '../../Game.state';
import { GAME_CONFIG } from '../../Game.config';
import { TabletopCharacter } from './components/TabletopCharacter/TabletopCharacter';

const cell = GAME_CONFIG.map.cell;

type TabletopProps = {};

export const Tabletop = memo((props: TabletopProps) => {
    const [{ map, characters }] = GameState.useContext();

    const width = map.cols * cell.size;
    const height = map.rows * cell.size;
    const projectedWidth = (width + height) / Math.SQRT2;
    const projectedHeight = projectedWidth / 2;
    const projectedOffsetX = (projectedWidth - width) / 2;
    const projectedOffsetY = (projectedHeight - height) / 2;

    return (
        <TabletopCamera>
            <div className={S.isoBounds} style={{ width: `${projectedWidth}px`, height: `${projectedHeight}px` }}>
                <div
                    className={S.isoLayer}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        left: `${projectedOffsetX}px`,
                        top: `${projectedOffsetY}px`
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
                        {[...Array(map.rows * map.cols)].map((_, index) => {
                            const x = map.rows - Math.floor(index / map.cols);
                            const y = map.cols - (index % map.cols);
                            const name = `(${x}, ${y})`;

                            return <div key={index} id={name} />;
                        })}

                        {characters.map((character) => (
                            <TabletopCharacter key={character.id} character={character} />
                        ))}
                    </div>
                </div>
            </div>
        </TabletopCamera>
    );
});

Tabletop.displayName = 'Tabletop';
