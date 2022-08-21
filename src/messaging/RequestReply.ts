/**
 * For example, Node.js network I/O: request and response
 */
import { EventEmitter } from 'events';
import WS, { WebSocket, WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';

const reverse = (str: string) => str.split('').reverse().join('');

export class Server {
  private server: WebSocketServer;
  constructor(port: number) {
    this.server = new WebSocketServer({ port });
    this.server.on('connection', ws => this.handleConnection(ws));
  }

  handleConnection(ws: WebSocket) {
    ws.on('message', msg => {
      const { message, correlationId, type } = JSON.parse(msg.toString());
      if (type === 'request' && message) {
        const payload = JSON.stringify({
          message: reverse(message),
          correlationId,
          type: 'reply',
        });
        ws.send(payload);
      }
    });
  }
}

type ResponseHandler = (message: string) => void;
interface QueueObject {
  message: string;
  callback: ResponseHandler;
}

export class Client {
  private socket: WS;
  private handlers: Record<string, ResponseHandler> = {};
  private emitter = new EventEmitter();
  private queue: QueueObject[] = [];

  constructor(wsURI: string) {
    this.emitter.once('canDequeue', () => this.dequeue());
    this.socket = new WS(wsURI);
    this.socket.on('open', () => {
      console.log('WebSocket connection is open');
      this.emitter.emit('canDequeue');
      this.socket.on('message', msg => this.handleReply(msg));
    });
  }

  handleReply(msg: WS.RawData) {
    const { message, correlationId, type } = JSON.parse(msg.toString());
    if (type === 'reply' && this.handlers[correlationId]) {
      this.handlers[correlationId](message);
      delete this.handlers[correlationId];
    }
  }

  dequeue() {
    this.queue.forEach(({ message, callback }) => this.send(message, callback));
    this.queue = [];
  }

  send(message: string, callback: ResponseHandler) {
    if (this.socket.readyState === WebSocket.OPEN) {
      const correlationId = uuid();
      this.handlers[correlationId] = callback;
      const payload = JSON.stringify({
        type: 'request',
        correlationId,
        message,
      });
      this.socket.send(payload);
    } else {
      this.queue.push({ message, callback });
    }
  }
}
