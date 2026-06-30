import { memo } from 'react';

import { Tabletop } from './components/Tabletop';

// import './Game.css';

export type GameProps = {};

export const Game = memo((props: GameProps) => {
    return (
        <div className="h-screen w-screen flex items-center justify-center overflow-hidden">
            <Tabletop />
        </div>
    );
    // return <Tabletop />;
});

Game.displayName = 'Game';
