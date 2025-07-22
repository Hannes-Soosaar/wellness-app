export interface ResponseData<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

interface RequestData {
  //TODO: create a standard data structure
}
