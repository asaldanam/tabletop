import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { uuid } from 'app/lib/uuid';
import { useEvents } from 'app/context/EventBusContext';
import PlayerInvitation from './components/PlayerInvitation';
import { GameContext } from '../../context/GameContext';

const Tabletop = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const [event] = useEvents();
    const game = GameContext.useState();

    useEffect(() => {
        (async () => {
            if (gameId) (await game.loadById(gameId)) || (await game.create(gameId));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId]);

    if (!game.data) return <div>Loading...</div>;

    return (
        <div className="Tabletop">
            <button
                onClick={async () => {
                    await game.addPlayer(uuid(), `Player ${(game.data?.players.length || 0) + 1}`);
                }}
            >
                push random player
            </button>
            <PlayerInvitation />
            <pre>{JSON.stringify(game, null, 2)}</pre>

            <h2>Events:</h2>
            <pre>{JSON.stringify(event, null, 2)}</pre>
        </div>
    );
};

export default Tabletop;
