import { createContextFromObject } from 'app/lib/react/createContextFromObject';
import { LocalstorageGameRepository } from 'app/repository/game/LocalstorageGameRepository';
import { GameService } from 'core/modules/game';

const game = new GameService(new LocalstorageGameRepository());

const GameReact = createContextFromObject(game);

export const GameProvider = GameReact.Provider;
export const GameContext = GameReact.Context;
