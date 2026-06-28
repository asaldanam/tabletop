import { memo } from 'react';
import { useGameState } from '../../Game.state';

import S from './Tabletop.module.css';

type TabletopProps = {};

export const Tabletop = memo((props: TabletopProps) => {
    const [{ camera, character, map }] = useGameState();

    return (
        <div>
            <div
                className={S.grid}
                style={{
                    gridTemplate: `repeat(${map.rows}, ${map.cell.size}px) / repeat(${map.cols}, ${map.cell.size}px)`,
                    width: `${map.cols * map.cell.size}px`,
                    height: `${map.rows * map.cell.size}px`,
                    //perspectiva isométrica
                    transform: `rotateX(60deg) rotateZ(45deg) scale(${camera.zoom}) translate3d(${camera.displacement.x}px, ${camera.displacement.y}px, 0px)`,
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Grid */}
                {[...Array(map.rows * map.cols)].map((_, index) => {
                    const x = map.rows - Math.floor(index / map.cols);
                    const y = map.cols - (index % map.cols);
                    const name = `(${x}, ${y})`;

                    return (
                        <div
                            key={index}
                            className={S.cell}
                            style={{ width: `${map.cell.size}px`, height: `${map.cell.size}px` }}
                        >
                            <span className="pointer-events-none">{name}</span>
                        </div>
                    );
                })}

                {/* Character */}
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
    );
});

Tabletop.displayName = 'Tabletop';
