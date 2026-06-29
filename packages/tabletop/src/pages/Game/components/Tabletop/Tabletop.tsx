import { memo } from 'react';
import { useGameState } from '../../Game.state';

import { TabletopCamera } from './components/TabletopCamera';
import S from './Tabletop.module.css';

type TabletopProps = {};

export const Tabletop = memo((props: TabletopProps) => {
    const [{ character, map }] = useGameState();
    const width = map.cols * map.cell.size;
    const height = map.rows * map.cell.size;
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
                            gridTemplate: `repeat(${map.rows}, ${map.cell.size}px) / repeat(${map.cols}, ${map.cell.size}px)`,
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

                        <input
                            className={S.character}
                            type="checkbox"
                            style={{
                                width: `${map.cell.size}px`,
                                height: `${map.cell.size}px`,
                                transform: `translate3d(${(character.position.x - 1) * map.cell.size}px, ${(character.position.y - 1) * map.cell.size}px, 1px)`
                            }}
                        />
                    </div>
                </div>
            </div>
        </TabletopCamera>
    );
});

Tabletop.displayName = 'Tabletop';
