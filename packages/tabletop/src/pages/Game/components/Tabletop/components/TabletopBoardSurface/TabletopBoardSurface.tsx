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
    const { map, characters, rounds } = game.state;
    const { rows, cols } = map;

    const [activeCell, setActiveCell] = useState<Cell | null>(null);

    const width = cols * cell.size;
    const height = rows * cell.size;

    const calcNextCell = (event: { nativeEvent: { offsetX: number; offsetY: number } }) => {
        const x = Math.floor(event.nativeEvent.offsetX / cell.size) + 1;
        const y = Math.floor(event.nativeEvent.offsetY / cell.size) + 1;

        if (x < 1 || x > cols || y < 1 || y > rows) return null;

        return { x, y };
    };

    const currentRound = rounds[0];
    const currentTurnCharacterId = currentRound?.turns[currentRound.currentTurnIndex]?.character.id ?? null;
    const currentTurnCharacter = characters.find((character) => character.id === currentTurnCharacterId);
    const anyCharMoving = characters.some((character) => character.movement.isMoving);
    const canMoveCurrentTurnCharacter = Boolean(currentTurnCharacter?.movement.isActive) && !anyCharMoving;

    return (
        <>
            <div
                aria-label="Mapa"
                className={S.map}
                style={{
                    height: `${height}px`,
                    width: `${width}px`,
                    backgroundImage: `url(/${map.image.url})`
                }}
            />
            <button
                className={S.surface}
                aria-label="Tablero"
                type="button"
                onMouseLeave={() => {
                    setActiveCell(null);
                }}
                onMouseMove={(event) => {
                    if (!canMoveCurrentTurnCharacter) return;

                    const nextCell = calcNextCell(event);
                    if (!nextCell) return;

                    const isSameCell = activeCell?.x === nextCell?.x && activeCell?.y === nextCell?.y;
                    if (isSameCell) return;

                    setActiveCell(nextCell);
                }}
                onClick={(event) => {
                    if (!canMoveCurrentTurnCharacter) return;

                    const nextCell = calcNextCell(event);
                    if (!nextCell) return;

                    onCellClick(nextCell);
                    setActiveCell(nextCell);
                }}
                style={
                    {
                        '--cell-size': `${cell.size}px`,
                        height: `${height}px`,
                        width: `${width}px`,
                        cursor: canMoveCurrentTurnCharacter ? 'pointer' : 'default'
                    } as CSSProperties
                }
            />
            {canMoveCurrentTurnCharacter && (
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
