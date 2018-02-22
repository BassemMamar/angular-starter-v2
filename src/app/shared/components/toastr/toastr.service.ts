import { Injectable } from '@angular/core';

import * as toastr from 'toastr';
import { ToastrDefaultOptions } from './model/toastr-options';

@Injectable()
export class ToastrService {
    constructor() {
        toastr.options = ToastrDefaultOptions;
    }

    success(message: string, title?: string, optionsOverride?: object) {
        toastr.success(message, title, optionsOverride);
    }

    info(message: string, title?: string, optionsOverride?: object) {
        toastr.info(message, title, optionsOverride);
    }

    warning(message: string, title?: string, optionsOverride?: object) {
        toastr.warning(message, title, optionsOverride);
    }

    error(message: string, title?: string, optionsOverride?: object) {
        toastr.error(message, title, optionsOverride);
    }

    /**
     * Immediately remove current toasts without using animation
     */
    remove() {
        toastr.error();
    }

    /**
     * Remove current toasts using animation
     */
    clear() {
        toastr.clear();
    }
}
