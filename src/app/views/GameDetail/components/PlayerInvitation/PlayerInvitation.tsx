import { CommunicationStore } from 'app/stores/CommunicationStore';
import { useEffect } from 'react';

const PlayerInvitation = () => {
    const communications = CommunicationStore.useState();

    useEffect(() => {}, []);

    console.log(communications);

    return (
        <>
            <div>Connections</div>
            <ul></ul>
            <button>START CONNECTION</button>
        </>
    );
};

export default PlayerInvitation;
