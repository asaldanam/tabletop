import { LocalstorageGameRepository } from 'app/repository/game/LocalstorageGameRepository';

import { GameService } from 'core/modules/game';
import GameDetail from './GameDetail';
import { GameDetailStore } from './GameDetailStore';

(window as any).tabletop = new GameService(new LocalstorageGameRepository());

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <GameDetailStore.Provider value={(window as any).tabletop}>
        <GameDetail />
    </GameDetailStore.Provider>
);
