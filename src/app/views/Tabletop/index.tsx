import { LocalstorageGameRepository } from 'app/repository/modules/game/LocalstorageGameRepository';

import { GameService } from 'core/modules/game';
import Tabletop from './Tabletop';
import { EventEmmiterEventBus } from 'app/repository/shared/EventEmmiterEventBus';
import { GameStore } from './GameStore';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <GameStore.Provider value={new GameService(new LocalstorageGameRepository(), new EventEmmiterEventBus())}>
        <Tabletop />
    </GameStore.Provider>
);
