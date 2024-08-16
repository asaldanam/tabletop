import { LocalstorageGameRepository } from 'app/repository/game/LocalstorageGameRepository';

import { GameService } from 'core/modules/game';
import GameList from './GameList';
import { GameListStore } from './GameListStore';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <GameListStore.Provider
        value={{
            games: [],
            actions: new GameService(new LocalstorageGameRepository())
        }}
    >
        <GameList />
    </GameListStore.Provider>
);
