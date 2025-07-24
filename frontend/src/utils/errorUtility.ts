// To handle errors in TS

import axios from "axios";

export const extractErrorMessage = (
  error: unknown
): { message: string; status?: number } => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message || error.message;
    const status = error.response?.status;
    return { message, status };
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "an unknown error occurred " };
};
