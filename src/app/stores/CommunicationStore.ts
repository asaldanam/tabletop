import { createStore } from 'app/lib/react/createStore';
import { Communication } from 'app/lib/webRTC/p2p';

export const CommunicationStore = createStore<Communication>();
