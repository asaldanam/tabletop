type SDP = string;

export class P2PConnection<Payload extends any> {
    private connection: RTCPeerConnection;
    private channel: RTCDataChannel;
    public status: RTCPeerConnectionState | RTCIceGatheringState | RTCSignalingState | RTCDataChannelState = 'new';
    public readonly subscriptions: Array<(data: Payload) => void> = [];

    constructor(
        public readonly config: {
            channel: string;
            peer: 'host' | 'guest';
            debug?: boolean;
        }
    ) {
        this.connection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: 'stun:stun.relay.metered.ca:80'
                },
                {
                    urls: 'turn:global.relay.metered.ca:80',
                    username: '72f8d2483176e6a31214a3a0',
                    credential: 'se8A8xoQLnCi6k+c'
                },
                {
                    urls: 'turn:global.relay.metered.ca:80?transport=tcp',
                    username: '72f8d2483176e6a31214a3a0',
                    credential: 'se8A8xoQLnCi6k+c'
                },
                {
                    urls: 'turn:global.relay.metered.ca:443',
                    username: '72f8d2483176e6a31214a3a0',
                    credential: 'se8A8xoQLnCi6k+c'
                },
                {
                    urls: 'turns:global.relay.metered.ca:443?transport=tcp',
                    username: '72f8d2483176e6a31214a3a0',
                    credential: 'se8A8xoQLnCi6k+c'
                }
            ]
        });

        this.channel = this.connection.createDataChannel('data');
        this.connection.addEventListener('icecandidate', (event) => {
            if (event.candidate) this.debug(event.candidate);
        });
        this.connection.addEventListener('icecandidateerror', (event) => {
            this.debug(event);
        });
    }

    async offer(): Promise<SDP> {
        const offer = await this.connection.createOffer();
        await this.connection.setLocalDescription(offer);

        this.status = this.connection.signalingState;
        this.debug(this.status);

        const sdp = await this.createLocalSdp();
        return sdp;
    }

    async answer(remoteSdp: SDP): Promise<SDP> {
        await this.connection.setRemoteDescription({ type: 'offer', sdp: remoteSdp });
        this.status = this.connection.signalingState;
        this.debug(this.status);

        const answer = await this.connection.createAnswer();
        await this.connection.setLocalDescription(answer);

        this.status = this.connection.signalingState;
        this.debug(this.status);

        const sdp = await this.createLocalSdp();
        return sdp;
    }

    async accept(remoteSdp: SDP): Promise<void> {
        await this.connection.setRemoteDescription({ type: 'answer', sdp: remoteSdp });
        this.status = this.connection.signalingState;
        this.debug(this.status);
    }

    async open(): Promise<void> {
        this.status = this.connection.connectionState;
        this.debug(this.status);

        const openedChannel: RTCDataChannel = await new Promise((resolve) => {
            this.status = this.connection.connectionState;
            this.debug(this.status);

            this.connection.addEventListener('datachannel', (event) => {
                resolve(event.channel);

                this.status = this.channel.readyState;
                this.debug(this.status);
            });
        });

        openedChannel.addEventListener('message', (event) => {
            this.subscriptions.forEach((subscription) => {
                const data: Payload = JSON.parse(event.data);
                subscription(data);
            });
        });
    }

    async send(data: Payload): Promise<void> {
        this.channel.send(JSON.stringify(data));
    }

    async subscribe(subscription: (data: Payload) => void): Promise<void> {
        this.subscriptions.push(subscription);
    }

    /** PRIVATE */

    private debug(message: any): void {
        if (this.config.debug) console.log(message);
    }

    private async createLocalSdp(): Promise<SDP> {
        return new Promise(
            (r) =>
                (this.connection.onicegatheringstatechange = (event) => {
                    this.status = this.connection.iceGatheringState;
                    this.debug(this.connection.iceGatheringState);
                    if (this.connection.iceGatheringState === 'complete') {
                        const sdp = this.connection.localDescription?.sdp;
                        if (!sdp) throw new Error('Local SDP not created');
                        r(sdp);
                    }
                })
        );
    }
}
