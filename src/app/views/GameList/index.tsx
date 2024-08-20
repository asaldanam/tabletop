import { LocalstorageGameRepository } from 'app/repository/modules/game/LocalstorageGameRepository';

import { GameService } from 'core/modules/game';
import GameList from './GameList';
import { GameListStore } from './GameListStore';
import { EventEmmiterEventBus } from 'app/repository/shared/EventEmmiterEventBus';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <GameListStore.Provider
        value={{
            games: [],
            actions: new GameService(new LocalstorageGameRepository(), new EventEmmiterEventBus())
        }}
    >
        <GameList />
    </GameListStore.Provider>
);
