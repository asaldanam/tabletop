import { createStore } from 'app/lib/react/createStore';
import { Game, GameService } from 'core/modules/game';

export const GameDetailStore = createStore<{
    game: Game | null;
    actions: GameService;
}>();
