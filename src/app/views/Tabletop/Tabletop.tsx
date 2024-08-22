import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { uuid } from 'app/lib/uuid';
import { GameContext } from '../../context/GameContext';

const Tabletop = () => {
    const { gameId } = useParams<{ gameId: string }>();
    const game = GameContext.useState();

    useEffect(() => {
        (async () => {
            if (gameId) (await game.loadById(gameId)) || (await game.create(gameId));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameId]);

    // PROTOCOL
    // const [peerId, setPeerId] = useState('');
    // useEffect(() => {
    //     const peer = new Peer();

    //     peer.on('open', function (id) {
    //         // Workaround for peer.reconnect deleting previous id
    //         if (peer.id === null) {
    //             console.log('Received null id from peer open');
    //         }

    //         console.log('ID: ' + peer.id);
    //         setPeerId(peer.id);
    //     });
    //     peer.on('connection', function (conn) {
    //         // Allow only a single connection
    //         const c = conn;
    //         if (conn && conn.open) {
    //             c.on('open', function () {
    //                 c.send('Already connected to another client');
    //                 setTimeout(function () {
    //                     c.close();
    //                 }, 500);
    //             });
    //             return;
    //         }

    //         console.log('Connected to: ' + conn.peer);
    //     });
    //     peer.on('disconnected', function () {
    //         console.log('Connection lost. Please reconnect');

    //         peer.reconnect();
    //     });
    //     peer.on('close', function () {
    //         console.log('Connection destroyed');
    //     });
    //     peer.on('error', function (err) {
    //         console.log(err);
    //     });
    // }, []);

    //
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

            {/* <Link to={`/invitation/${peerId}`} target="_blank">
                Invite {peerId}
            </Link> */}

            <pre>{JSON.stringify(game, null, 2)}</pre>

            {/* <h2>Events:</h2>
            <pre>{JSON.stringify(event, null, 2)}</pre> */}
        </div>
    );
};

export default Tabletop;
