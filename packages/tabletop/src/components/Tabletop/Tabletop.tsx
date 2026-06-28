import { memo } from 'react';
import S from './Tabletop.module.css';

type TabletopProps = {};

export const Tabletop = memo((props: TabletopProps) => {
    const grid = {
        x: 12,
        y: 12
    };

    const cell = {
        size: 64
    };

    return (
        <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
            <div>
                <div
                    className={S.grid}
                    style={{
                        gridTemplate: `repeat(${grid.x}, ${cell.size}px) / repeat(${grid.y}, ${cell.size}px)`,
                        width: `${grid.y * cell.size}px`,
                        height: `${grid.x * cell.size}px`,
                        //perspectiva isométrica
                        transform: `rotateX(60deg) rotateZ(45deg) scale(1)`,
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {[...Array(grid.x * grid.y)].map((_, index) => (
                        <div
                            key={index}
                            className={S.cell}
                            style={{ width: `${cell.size}px`, height: `${cell.size}px` }}
                        >
                            <span>{index + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

Tabletop.displayName = 'Tabletop';
