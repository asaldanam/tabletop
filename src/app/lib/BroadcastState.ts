import { createObjectMutationObserver } from './createObjectMutationObserver';

export class BroadcastState<State extends object> {
    public meta: {
        host: HostConnection | undefined;
        players: { [key: string]: any };
    };
    public state: State;

    constructor(state: State, config: { isHost: boolean; RTCConfiguration?: RTCConfiguration }) {
        this.meta = {
            host: config.isHost ? new HostConnection(config.RTCConfiguration) : undefined,
            players: {}
        };

        this.state = createObjectMutationObserver(state, { onMutation: () => {} });
    }

    async offer() {}
}

class HostConnection {
    private conn: RTCPeerConnection;
    private channel: RTCDataChannel;

    constructor(RTCConfiguration?: RTCConfiguration) {
        this.conn = new RTCPeerConnection(RTCConfiguration);
        this.channel = this.conn.createDataChannel('data');

        this.conn.addEventListener('signalingstatechange', (_) =>
            console.log('signalingstatechange ' + this.conn.signalingState)
        );
        this.conn.addEventListener('icegatheringstatechange', (_) =>
            console.log('icegatheringstatechange ' + this.conn.iceGatheringState)
        );
        this.conn.addEventListener('connectionstatechange', (_) =>
            console.log('connectionstatechange ' + this.conn.connectionState)
        );
    }

    async createOffer() {
        const offer = await this.conn.createOffer();
        await this.conn.setLocalDescription(offer);
        return offer;
    }

    async acceptAnswer(answer: RTCSessionDescriptionInit) {
        await this.conn.setRemoteDescription(answer);
    }

    async send(data: any) {
        if (this.channel.readyState !== 'open') {
            await new Promise((resolve) => this.channel.addEventListener('open', resolve));
        }
        this.channel.send(JSON.stringify(data));
    }
}
