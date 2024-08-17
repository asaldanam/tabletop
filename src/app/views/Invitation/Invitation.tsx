import { CommunicationStore } from 'app/stores/CommunicationStore';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

const Invitation = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const offer = searchParams.get('offer');
    const { id } = useParams<{ id: string }>();
    const communications = CommunicationStore.useState();
    const [answer, setAnswer] = useState<string>();

    useEffect(() => {
        const load = async () => {
            if (!offer) return;
            const { connection } = await communications.createConnection(id);
            const result = await connection.handshake(offer);
            const answer = result.signal;

            if (!answer) throw new Error('No answer');
            setAnswer(answer);
        };
        load();
    }, [id, offer]);

    if (!id) return null;

    const connection = communications.conections[id];
    if (!connection) return null;

    return (
        <>
            <div className="Invitation">
                <div>Devuélvele este código a tu Master:</div>
                <textarea value={connection.signal || ''} rows={8} readOnly />
                <button
                    onClick={() => {
                        // p2p.send('qwerqwerqwerqwerqwer');
                    }}
                >
                    SEND
                </button>
                {/* {connected ? '🟢' : '🔴'} */}
            </div>
        </>
    );
};

export default Invitation;
