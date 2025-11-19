declare module "*.css";

export type APIResponse<T> = {
  data?: T;
  statusCode: number;
  error?: string;
};
