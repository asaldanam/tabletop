import { LocalstorageGameRepository } from 'app/repository/game/LocalstorageGameRepository';

import { GameService } from 'core/modules/game';
import GameDetail from './GameDetail';
import { GameDetailStore } from './GameDetailStore';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <GameDetailStore.Provider
        value={{
            game: null,
            actions: new GameService(new LocalstorageGameRepository())
        }}
    >
        <GameDetail />
    </GameDetailStore.Provider>
);
