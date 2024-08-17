import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Game } from 'core/modules/game';
import { GameDetailStore } from './GameDetailStore';
import { Player } from 'core/modules/game/domain/Player';
import { uuid } from 'app/lib/uuid';
import PlayerInvitation from './components/PlayerInvitation';

const GameDetail = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const store = GameDetailStore.useState();

    useEffect(() => {
        const load = async () => {
            if (!gameId) return;
            const game = await store.actions.findById(gameId);

            if (game) {
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

    return (
        <div className="GameDetail">
            <button
                onClick={async () => {
                    await store.actions.addPlayer(
                        game,
                        Player.create({
                            id: uuid(),
                            name: 'player-' + game.players.length
                        })
                    );
                }}
            >
                push random player
            </button>
            <PlayerInvitation />
            <pre>{JSON.stringify(game, null, 2)}</pre>
        </div>
    );
};

export default GameDetail;
