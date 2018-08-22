import { EnvironmentService } from '../environment.variables';
import { extractKey } from '../utilities/keys';

let environmentService = new EnvironmentService('.env');
//  Creamos la interface del environment
interface IEnvironmentConfig {
  rootPath: string;
  db: string;
  httpPort: number;
  wsPort: number;
  jwtSecret: string;
  domain: string;
  httpProtocol: string;
  wsProtocol: string;
  awsKey: string;
  awsSecret: string;
}

//  Creamos una interface "IConfig", la cual contendrá a IEnvironmentConfig
interface IConfig {
  [key: string]: IEnvironmentConfig;
  development: IEnvironmentConfig;
  production: IEnvironmentConfig;
}

const rootPath = process.cwd();
const jwtSecret = extractKey(`${rootPath}/keys/jwt.private.key`);

//  Definimos los valores para local y produccion
const Config: IConfig = {
  development: {
    rootPath,
    db: 'mongodb://localhost:27017/store',
    httpPort: 1337,
    wsPort: 1338,
    jwtSecret,
    domain: 'localhost',
    httpProtocol: 'http',
    wsProtocol: 'ws',
    awsKey: environmentService.get('AWS_KEY'),
    awsSecret: environmentService.get('AWS_SECRET')
  },
  production: {
    rootPath,
    db: environmentService.get('MONGODB_CONNECTION'),
    httpPort: + environmentService.get('HTTP_SERVER_PORT'),
    wsPort: + environmentService.get('WS_PORT'),
    jwtSecret,
    domain: environmentService.get('DOMAIN'),
    httpProtocol: environmentService.get('HTTP_PROTOCOL'),
    wsProtocol: environmentService.get('WS_PROTOCOL'),
    awsKey: environmentService.get('AWS_KEY'),
    awsSecret: environmentService.get('AWS_SECRET')
  }
};

export {
  IEnvironmentConfig,
  IConfig,
  Config
};
