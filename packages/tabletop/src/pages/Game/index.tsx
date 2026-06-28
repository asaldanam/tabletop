import { Game, GameProps } from './Game';
import { GameState } from './Game.state';

export default (props: GameProps) => (
    <GameState.Provider>
        <Game {...props} />
    </GameState.Provider>
);
