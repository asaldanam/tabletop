import { useEffect } from 'react';
import { GameStore } from './GameStore';
import { Game } from 'core/modules/game';

const GameView = () => {
    const store = GameStore.use();

    useEffect(() => {
        store.game = new Game({
            id: crypto.randomUUID(),
            players: []
        });
    }, []);

    if (!store.game) return null;
    const game = store.game;

    console.log('GameView', game);

    return (
        <>
            <div className="GameView">
                <button
                    onClick={async () => {
                        game.players.push({
                            id: crypto.randomUUID(),
                            name: `Player ${game.players.length + 1}`,
                            games: []
                        });

                        await store.actions.save(game);
                    }}
                >
                    push random player
                </button>
                <pre>{JSON.stringify(game, null, 2)}</pre>
            </div>
        </>
    );
};

export default GameView;
