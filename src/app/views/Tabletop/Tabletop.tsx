import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { uuid } from 'app/lib/uuid';
import { useEvents } from 'app/context/EventBusContext';
import PlayerInvitation from './components/PlayerInvitation';
import { GameStore } from './GameStore';

const Tabletop = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const [event] = useEvents();
    const game = GameStore.useState();

    useEffect(() => {
        const load = async () => {
            if (!gameId) return;
            const savedGame = await game.loadById(gameId);
            if (!savedGame) await game.create(gameId);
        };

        load();
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
