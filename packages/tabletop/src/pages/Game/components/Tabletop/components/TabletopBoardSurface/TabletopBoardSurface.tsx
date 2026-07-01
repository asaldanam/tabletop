import { CSSProperties, memo, useRef, useState } from 'react';

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
    const { map, selectedCharacterId } = game.state;
    const { rows, cols } = map;

    const [activeCell, setActiveCell] = useState<Cell | null>(null);
    const recentlyClickedCellRef = useRef<Cell | null>(null);

    const width = cols * cell.size;
    const height = rows * cell.size;

    const calcNextCell = (event: { nativeEvent: { offsetX: number; offsetY: number } }) => {
        const x = Math.floor(event.nativeEvent.offsetX / cell.size) + 1;
        const y = Math.floor(event.nativeEvent.offsetY / cell.size) + 1;

        if (x < 1 || x > cols || y < 1 || y > rows) return null;

        return { x, y };
    };

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
                className={S.surface}
                aria-label="Tablero"
                type="button"
                onMouseLeave={() => {}}
                onMouseMove={(event) => {
                    if (recentlyClickedCellRef.current) return;

                    const nextCell = calcNextCell(event);
                    if (!nextCell) return;

                    const isSameCell = activeCell?.x === nextCell?.x && activeCell?.y === nextCell?.y;
                    if (isSameCell) return;

                    setActiveCell(nextCell);
                }}
                onClick={(event) => {
                    const nextCell = calcNextCell(event);
                    if (!nextCell) return;

                    onCellClick(nextCell);

                    recentlyClickedCellRef.current = nextCell;
                    setTimeout(() => {
                        recentlyClickedCellRef.current = null;
                    }, 1000);
                }}
                style={
                    {
                        '--cell-size': `${cell.size}px`,
                        height: `${height}px`,
                        width: `${width}px`,
                        cursor: selectedCharacterId ? 'pointer' : 'default'
                    } as CSSProperties
                }
            />
            {selectedCharacterId && (
                <div
                    aria-hidden="true"
                    className={S.hoverCell}
                    style={{
                        opacity: activeCell ? 0.5 : 0,
                        transition: 'opacity 0.2s ease-in-out',
                        height: `${cell.size}px`,
                        transform: activeCell
                            ? `translate3d(${(activeCell.x - 1) * cell.size}px, ${(activeCell.y - 1) * cell.size}px, 0)`
                            : 'translate3d(0, 0, 0)',
                        width: `${cell.size}px`
                    }}
                />
            )}
        </>
    );
});

TabletopBoardSurface.displayName = 'TabletopBoardSurface';
