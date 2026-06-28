import { memo } from 'react';
import S from './Tabletop.module.css';

type TabletopProps = {};

export const Tabletop = memo((props: TabletopProps) => {
    const camera = {
        zoom: 1
    };

    const map = {
        rows: 24,
        cols: 24,
        cell: {
            size: 64
        }
    };

    const character = {
        position: {
            x: 18,
            y: 12
        }
    };

    return (
        <div>
            <div
                className={S.grid}
                style={{
                    gridTemplate: `repeat(${map.rows}, ${map.cell.size}px) / repeat(${map.cols}, ${map.cell.size}px)`,
                    width: `${map.cols * map.cell.size}px`,
                    height: `${map.rows * map.cell.size}px`,
                    //perspectiva isométrica
                    transform: `rotateX(60deg) rotateZ(45deg) scale(${camera.zoom})`,
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
                <div
                    className={S.character}
                    style={{
                        width: `${map.cell.size}px`,
                        height: `${map.cell.size}px`,
                        transform: `translate3d(${(character.position.x - 1) * map.cell.size}px, ${(character.position.y - 1) * map.cell.size}px, 0)`
                    }}
                >
                    <span className="pointer-events-none"></span>
                </div>
            </div>
        </div>
    );
});

Tabletop.displayName = 'Tabletop';
