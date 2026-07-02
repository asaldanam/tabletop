import { memo } from 'react';

import { Round } from './components/Round';
import { Tabletop } from './components/Tabletop';
import { Toolbar } from './components/Toolbar';

export type GameProps = {};

export const Game = memo((props: GameProps) => {
    return (
        <div>
            <Round />
            <Tabletop />
            <Toolbar />
        </div>
    );
});

Game.displayName = 'Game';
