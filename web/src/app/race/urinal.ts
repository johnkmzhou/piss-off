import * as Rx from 'rxjs/Rx';
export class Urinal {
    id: number;
    name: string;
    connected: boolean;
    server: string;
    socket: Rx.Subject<MessageEvent>
}
