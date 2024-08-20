import SimplePeer from 'simple-peer';
import { uuid } from '../uuid';
export const Peer = (window as any).SimplePeer as typeof SimplePeer;

export class Communication {
    conections: { [id: string]: Connection } = {};

    async createConnection(providedId?: string) {
        const id = providedId || (uuid() as string);

        const connection = await new Connection({ initiator: !providedId }).start();
        this.conections[id] = connection;

        return { id, connection };
    }

    async broadcast(data: string) {}
}

export class Connection {
    peer: SimplePeer.Instance | null = null;
    signal: string | null = null;
    status: 'idle' | 'pending' | 'connected' | 'disconnected' = 'idle';

    constructor(private opts: SimplePeer.Options) {}

    async start(): Promise<Connection> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.peer = new Peer({ ...this.opts, trickle: false });

                this.peer.on('connect', () => {
                    console.log('connect', this);
                    this.status = 'connected';
                });

                this.peer.on('error', (error) => {
                    console.error(error);
                    this.status = 'disconnected';
                    reject(error);
                });

                this.peer.on('data', (data) => {
                    const text = new TextDecoder().decode(data);
                    console.log(text);
                });

                if (!this.opts.initiator) resolve(this);

                this.peer.on('signal', (data) => {
                    if (data.type === 'offer' || data.type === 'answer') {
                        const signal = btoa(JSON.stringify(data));
                        this.signal = signal;
                        this.status = 'pending';
                        console.log(this);
                        resolve(this);
                    }
                });
            });
        });
    }

    async handshake(signal: string): Promise<Connection> {
        const data = JSON.parse(atob(signal));
        if (!this.peer) throw new Error('Connection not started');
        this.peer.signal(data);

        return new Promise((resolve) => {
            this.peer!.on('signal', (data) => {
                const signal = btoa(JSON.stringify(data));
                this.signal = signal;
                this.status = 'connected';
                resolve(this);
            });
        });
    }

    async send(data: string) {
        if (!this.peer) throw new Error('Connection not started');
        this.peer.send(data);
    }
}
