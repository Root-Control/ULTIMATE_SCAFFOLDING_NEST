import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  OnGatewayInit
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@WebSocketGateway()

export class EventsGateway implements OnGatewayInit {
  @WebSocketServer() server;

  constructor() {
  }

  afterInit() {
    //console.log(this.server);
    this.server.emit('testing', { do: 'stuff' });
    this.cron();
  }

  cron() {
/*    console.log('cron initialized');
    setTimeout(() => {
      return this.server.emit('events', { message: 'timeout' });
    }, 20000);*/
  }
  /*
   *  Explicación de proceso
   *  1.- Creamos un socket llamado events, el cual al ser llamado ejecutará una respuesta
   */
  @SubscribeMessage('events')
  findAll(client, data) {
    return this.server.emit('events', { message: 'works' });
  }

  @SubscribeMessage('identity')
  async identity(client, data: number): Promise<number> {
    return data;
  }
}