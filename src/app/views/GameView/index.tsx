import { GameService } from 'core/modules/game';
import { GameStore } from './GameStore';
import GameView from './GameView';
import { LocalstorageGameRepository } from 'app/repository/game/LocalstorageGameRepository';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <GameStore.Provider
        value={{
            game: null,
            actions: new GameService(new LocalstorageGameRepository())
        }}
    >
        <GameView />
    </GameStore.Provider>
);
