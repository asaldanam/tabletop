import { useContext, useEffect } from 'react';
import { GameContext } from './GameContext';

const GameView = () => {
    const service = useContext(GameContext);
    const game = service.game;

    useEffect(() => {
        service.create();
    }, []);

    if (!game) return null;

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

                        await service.save();
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
