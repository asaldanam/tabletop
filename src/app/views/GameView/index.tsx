import { GameProvider } from './GameContext';
import GameView from './GameView';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <GameProvider>
        <GameView />
    </GameProvider>
);
