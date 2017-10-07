/**
 * Created by hkb on 07.10.17.
 */
export class Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
