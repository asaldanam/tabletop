import { CSSProperties, memo, useState } from 'react';

import { GAME_CONFIG } from '../../../../Game.config';
import { GameState } from '../../../../Game.state';
import type { Cell } from '../../../../types/Cell';

import S from './TabletopBoardSurface.module.css';

const cell = GAME_CONFIG.map.cell;

type TabletopBoardSurfaceProps = {
    onCellClick: (position: Cell) => void;
};

export const TabletopBoardSurface = memo((props: TabletopBoardSurfaceProps) => {
    const { onCellClick } = props;

    const game = GameState.useContext();
    const { map } = game.state;
    const { rows, cols } = map;

    const [hoveredCell, setHoveredCell] = useState<Cell | null>(null);

    const width = cols * cell.size;
    const height = rows * cell.size;

    return (
        <>
            <div
                aria-label="Mapa"
                className={S.map}
                style={{
                    height: `${height}px`,
                    width: `${width}px`,
                    backgroundImage: `url(/${map.image})`
                }}
            />
            <button
                aria-label="Tablero"
                className={S.surface}
                type="button"
                // onPointerLeave={() => setHoveredCell(null)}
                onPointerMove={(event) => {
                    const x = Math.floor(event.nativeEvent.offsetX / cell.size) + 1;
                    const y = Math.floor(event.nativeEvent.offsetY / cell.size) + 1;

                    if (x < 1 || x > cols || y < 1 || y > rows) return null;

                    const nextHoveredCell = { x, y };

                    const isSameCell = hoveredCell?.x === nextHoveredCell?.x && hoveredCell?.y === nextHoveredCell?.y;
                    if (isSameCell) return;

                    setHoveredCell(nextHoveredCell);
                }}
                onClick={(event) => {
                    const x = Math.floor(event.nativeEvent.offsetX / cell.size) + 1;
                    const y = Math.floor(event.nativeEvent.offsetY / cell.size) + 1;

                    if (x < 1 || x > cols || y < 1 || y > rows) return null;

                    onCellClick({ x, y });
                }}
                style={
                    {
                        '--cell-size': `${cell.size}px`,
                        height: `${height}px`,
                        width: `${width}px`
                    } as CSSProperties
                }
            />

            {hoveredCell && (
                <div
                    aria-hidden="true"
                    className={S.hoverCell}
                    style={{
                        height: `${cell.size}px`,
                        transform: `translate3d(${(hoveredCell.x - 1) * cell.size}px, ${(hoveredCell.y - 1) * cell.size}px, 0)`,
                        width: `${cell.size}px`
                    }}
                />
            )}
        </>
    );
});

TabletopBoardSurface.displayName = 'TabletopBoardSurface';
