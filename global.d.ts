export {};

type GtagEventParams = Record<string, unknown> & {
  send_to?: string;
  event_callback?: () => void;
};

type GtagFn = {
  (command: "event", eventName: string, params?: GtagEventParams): void;
  (command: "config", targetId: string, params?: Record<string, unknown>): void;
  (command: "js", date: Date): void;
};

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}
