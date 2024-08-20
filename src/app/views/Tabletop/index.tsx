import { LocalstorageGameRepository } from 'app/repository/modules/game/LocalstorageGameRepository';

import { GameService } from 'core/modules/game';
import Tabletop from './Tabletop';
import { EventEmmiterEventBus } from 'app/repository/shared/EventEmmiterEventBus';
import { GameContext } from '../../context/GameContext';

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <GameContext.Provider value={new GameService(new LocalstorageGameRepository(), new EventEmmiterEventBus())}>
        <Tabletop />
    </GameContext.Provider>
);
