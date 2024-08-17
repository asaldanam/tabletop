import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { uuid } from 'app/lib/uuid';
import { GameListStore } from './GameListStore';

const GameList = () => {
    const store = GameListStore.useState();

    useEffect(() => {
        const load = async () => {
            store.games = await store.actions.findAll();
        };
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <ul>
                {store.games.map((game) => (
                    <li key={game.id as string}>
                        <Link to={`/game/${game.id}`}>{game.id}</Link>
                    </li>
                ))}

                <li>
                    <Link to={`/game/${uuid()}`}>New Game</Link>
                </li>
            </ul>
        </div>
    );
};

export default GameList;
