import { CommunicationStore } from 'app/stores/CommunicationStore';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlayerInvitation = () => {
    const communications = CommunicationStore.useState();

    useEffect(() => {}, []);

    console.log(communications);

    return (
        <>
            <div>Connections</div>
            <ul>
                {Object.entries(communications.conections).map(([id, connection]) => {
                    return (
                        <li key={connection.signal}>
                            {!connection.signal && <button onClick={() => connection.start()}>START</button>}
                            {connection.signal && (
                                <Link to={`/invitation/${id}?offer=${connection.signal}`} target="_blank">
                                    PlayerInvitation
                                </Link>
                            )}
                            <button
                                onClick={async () => {
                                    const answer = prompt('Paste the answer') || '';
                                    await connection.handshake(answer);
                                }}
                            >
                                HANDSHAKE ANSWER
                            </button>
                            <button onClick={() => {}}>SEND</button>
                            <span>{connection.status}</span>
                        </li>
                    );
                })}
            </ul>
            <button onClick={() => communications.createConnection()}>START CONNECTION</button>
        </>
    );
};

export default PlayerInvitation;
