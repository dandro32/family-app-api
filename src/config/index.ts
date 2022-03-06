interface ResponseOK {
  status: "OK";
}

const API_ROUTE: string = "/api";
const JWT_ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET as string;
const JWT_REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET as string;
const RESPONSE_OK: ResponseOK = { status: "OK" };

export { API_ROUTE, JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, RESPONSE_OK };
