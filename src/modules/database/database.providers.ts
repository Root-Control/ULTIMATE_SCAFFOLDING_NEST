import * as mongoose from 'mongoose';
import { SERVER_CONFIG, DB_CONNECTION_TOKEN } from '../../server.constants';

 const opts = {
 	useNewUrlParser: true,
    keepAlive: 120,
    socketTimeoutMS: 30000,
    poolSize: 100,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    autoReconnect: true,
  };
export const databaseProviders = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async () => {
      (mongoose as any).Promise = global.Promise;
      return await mongoose.connect(SERVER_CONFIG.db, opts);
    },
  },
];