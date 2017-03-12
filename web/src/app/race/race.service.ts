import { Injectable } from '@angular/core';
//import { $WebSocket, WebSocketSendMode } from 'angular2-websocket/angular2-websocket';
import * as Rx from 'rxjs/Rx';
import { Urinal } from "./urinal";

@Injectable()
export class RaceService {
  // public urinals = new Array<Urinal>(
  //     { id: 1, name: "Urinal 1", connected: false, server: "ws://localhost:12345/ws", socket: null },
  //     { id: 2, name: "Urinal 2", connected: false, server: "ws://192.168.57.1:12345/ws", socket: null },
  //     { id: 3, name: "Urinal 3", connected: false, server: "ws://192.168.57.1:12345/ws", socket: null }
  //   );
  public urinals = new Array<Urinal>(
    { id: 1, name: "Urinal 1", connected: false, server: "ws://169.254.152.230:3000/", socket: null },
    { id: 2, name: "Urinal 2", connected: false, server: "ws://169.254.152.230:3000/mercury", socket: null }
  );
  constructor() {
    this.urinals.forEach(urinal => {
      let ws = new WebSocket(urinal.server);
      let observable = Rx.Observable.create(
        (obs: Rx.Observer<MessageEvent>) => {
          ws.onmessage = obs.next.bind(obs);
          ws.onerror = obs.error.bind(obs);
          ws.onclose = obs.complete.bind(obs);
          return ws.close.bind(ws);
        })
      let observer = {
        next: (data: Object) => {
          if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(data));
          }
        }
      }
      urinal.socket = Rx.Subject.create(observer, observable);
    });
  }
}
