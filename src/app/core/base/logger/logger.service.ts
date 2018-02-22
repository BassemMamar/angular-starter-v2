import { Injectable, ClassProvider } from '@angular/core';

import { ConsoleLoggerService } from './console-logger.service';


const noop = (): any => undefined;

export abstract class Logger {
  log: any;
  info: any;
  warn: any;
  error: any;
  trace: any;
  debug: any;
  table: any;
}

@Injectable()
export class LoggerService implements Logger {
  log: any;
  info: any;
  warn: any;
  error: any;
  trace: any;
  debug: any;
  table: any;
}

export const loggerProvider: ClassProvider = { provide: LoggerService, useClass: ConsoleLoggerService };
