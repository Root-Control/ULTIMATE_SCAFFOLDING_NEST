import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
import * as chalk from 'chalk';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  resolve(...args: any[]): MiddlewareFunction {
    let logMessage;
    const log = chalk.default;
    return (req, res, next) => {
        logMessage = `Url: ${req.baseUrl}`;
        console.log(log.white(logMessage));
        next();
    };
  }
}