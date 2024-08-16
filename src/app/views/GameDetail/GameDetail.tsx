import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Game } from 'core/modules/game';
import { GameDetailStore } from './GameDetailStore';

const GameDetail = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const store = GameDetailStore.use();

    useEffect(() => {
        const load = async () => {
            if (!gameId) return;
            const game = await store.actions.findById(gameId);

            if (game) {
                console.log('load');
                store.game = game;
                return;
            }

            console.log('create');
            store.game = Game.create(gameId);
            store.actions.save(store.game);
        };

        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId]);

    if (!store.game) return null;
    const game = store.game;

    console.log('GameDetail', game);

    return (
        <div className="GameDetail">
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
    );
};

export default GameDetail;
