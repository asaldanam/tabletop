import { CommunicationContext } from 'app/context/CommunicationContext';
import { useEffect } from 'react';

const PlayerInvitation = () => {
    const communications = CommunicationContext.useState();

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
