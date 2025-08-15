export interface ServerToClientEvents<T> {
  dataUpdated: (data: T) => void;
  chatMessage: (message: string) => void;
}

export interface ClientToServerEvents {
  chatMessage: (message: string) => void;
}
