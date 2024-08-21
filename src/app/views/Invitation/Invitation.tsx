import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PeerJs from 'peerjs';
const Peer = (window as any).Peer as typeof PeerJs;

const Invitation = () => {
    const { hostId } = useParams<{ hostId: string }>();

    // function join() {}

    useEffect(() => {
        console.log('hostId', hostId);
        if (!hostId) return;

        const peer = new Peer();

        // Create connection to destination peer specified in the input field
        const conn = peer.connect(hostId, {
            reliable: true
        });

        console.log(conn);

        conn.on('open', function () {
            console.log('Connected to: ' + conn.peer);
        });
        // Handle incoming data (messages only since this is the signal sender)
        conn.on('data', function (data) {
            console.log('Received', data);
        });
        conn.on('close', function () {
            console.log('Connection closed');
        });
        conn.on('error', function (err) {
            console.log('Error', err);
        });
    }, [hostId]);

    return (
        <>
            <div className="Invitation">
                <div></div>
            </div>
        </>
    );
};

export default Invitation;
