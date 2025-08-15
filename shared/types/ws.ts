export interface ServerToClientEvents<T> {
  dashboardUpdated: (data: T) => void;
  chatMessage?: (message: string) => void;
}

export interface ClientToServerEvents {
  chatMessage: (message: string) => void;
}
