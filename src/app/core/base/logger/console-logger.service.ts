import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

import { Logger } from './logger.service';

export let isDebugMode = environment.isDebugMode;

const noop = (): any => undefined;

@Injectable()
export class ConsoleLoggerService implements Logger {
    private appPrefix = 'Frontend Shell';
    get log() {
        if (isDebugMode) {
            return console.log.bind(console, `[${this.appPrefix} Log]`);
        } else {
            return noop;
        }
    }

    get info() {
        if (isDebugMode) {
            return console.info.bind(console, `[${this.appPrefix} Info]`);
        } else {
            return noop;
        }
    }

    get warn() {
        if (isDebugMode) {
            return console.warn.bind(console, `[${this.appPrefix} Warn]`);
        } else {
            return noop;
        }
    }

    get error() {
        if (isDebugMode) {
            return console.error.bind(console, `[${this.appPrefix} Error]`);
        } else {
            return noop;
        }
    }

    get trace() {
        if (isDebugMode) {
            return console.trace.bind(console, `[${this.appPrefix} Trace]`);
        } else {
            return noop;
        }
    }

    get debug() {
        if (isDebugMode) {
            return console.debug.bind(console, `[${this.appPrefix} Debug]`);
        } else {
            return noop;
        }
    }

    get table() {
        if (isDebugMode) {
            return console.table.bind(console, `[${this.appPrefix} Table]`);
        } else {
            return noop;
        }
    }
}

