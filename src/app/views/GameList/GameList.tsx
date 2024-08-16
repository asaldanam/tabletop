import { Link } from 'react-router-dom';
import { GameListStore } from './GameListStore';
import { useEffect } from 'react';

const GameList = () => {
    const store = GameListStore.use();

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
                    <Link to={`/game/${crypto.randomUUID()}`}>New Game</Link>
                </li>
            </ul>
        </div>
    );
};

export default GameList;
