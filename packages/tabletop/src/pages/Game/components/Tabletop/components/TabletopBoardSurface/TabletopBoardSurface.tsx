import { CSSProperties, memo, useCallback, useState, type PointerEvent } from 'react';

import S from './TabletopBoardSurface.module.css';
import { GameState } from '../../../../Game.state';

type CellPosition = {
    x: number;
    y: number;
};

type TabletopBoardSurfaceProps = {
    rows: number;
    cols: number;
    cellSize: number;
    onCellClick: (position: CellPosition) => void;
};

const getCellFromPointerEvent = (
    event: PointerEvent<HTMLButtonElement>,
    params: Pick<TabletopBoardSurfaceProps, 'cellSize' | 'cols' | 'rows'>
): CellPosition | null => {
    const x = Math.floor(event.nativeEvent.offsetX / params.cellSize) + 1;
    const y = Math.floor(event.nativeEvent.offsetY / params.cellSize) + 1;

    if (x < 1 || x > params.cols || y < 1 || y > params.rows) return null;

    return { x, y };
};

export const TabletopBoardSurface = memo((props: TabletopBoardSurfaceProps) => {
    const { rows, cols, cellSize, onCellClick } = props;
    const {
        state: { map }
    } = GameState.useContext();
    const [hoveredCell, setHoveredCell] = useState<CellPosition | null>(null);

    const width = cols * cellSize;
    const height = rows * cellSize;
    return (
        <>
            <div
                aria-label="Mapa"
                className={S.map}
                style={
                    {
                        height: `${height}px`,
                        width: `${width}px`,
                        backgroundImage: `url(/${map.image})`
                    } as CSSProperties
                }
            />
            <button
                aria-label="Tablero"
                className={S.surface}
                onClick={(event) => {
                    const cell = getCellFromPointerEvent(event as any, { cellSize, cols, rows });
                    if (!cell) return;

                    onCellClick(cell);
                }}
                onPointerLeave={() => setHoveredCell(null)}
                style={
                    {
                        '--cell-size': `${cellSize}px`,
                        height: `${height}px`,
                        width: `${width}px`
                    } as CSSProperties
                }
                type="button"
            />

            {hoveredCell && (
                <div
                    aria-hidden="true"
                    className={S.hoverCell}
                    style={{
                        height: `${cellSize}px`,
                        transform: `translate3d(${(hoveredCell.x - 1) * cellSize}px, ${(hoveredCell.y - 1) * cellSize}px, 0)`,
                        width: `${cellSize}px`
                    }}
                />
            )}
        </>
    );
});

TabletopBoardSurface.displayName = 'TabletopBoardSurface';
