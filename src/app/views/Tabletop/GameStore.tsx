import { createStore } from 'app/lib/react/createStore';
import { GameService } from 'core/modules/game';

export const GameStore = createStore<GameService>();
