export enum ToastType {
  SUCCESS,
  ERROR,
}

export interface Toast {
  message: string;
  type: ToastType;
  icon: string;
  displayedTime: number;
}
