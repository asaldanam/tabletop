import { createStore } from 'app/lib/react/createStore';
import { Game, GameService } from 'core/modules/game';

export const GameListStore = createStore<{
    games: Game[];
    actions: GameService;
}>();
