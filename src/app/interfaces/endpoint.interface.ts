export interface Endpoint {
  id: number;
  method: string;
  endPoint: string;
  parentCategory: string;
  parentRegistry: string;
  values: {
    desription: string | null;
    requestHeader: string | null;
    requestBody: string | null;
    responseBody: string | null;
  } | null;
}
