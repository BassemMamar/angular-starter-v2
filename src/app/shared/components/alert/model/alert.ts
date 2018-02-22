import { AlertType } from './alert-type';

export class Alert {
    type: AlertType;
    title: string;
    message: string;
    forRoot: boolean;
    hostId: string;
    showDuration: number;
}
