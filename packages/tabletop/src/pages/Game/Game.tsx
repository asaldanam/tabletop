import { memo } from 'react';

import { Tabletop } from './components/Tabletop';
import { Round } from './components/Round/Round';

// import './Game.css';

export type GameProps = {};

export const Game = memo((props: GameProps) => {
    return (
        <div>
            <Round />
            <Tabletop />
        </div>
    );
    // return <Tabletop />;
});

Game.displayName = 'Game';
