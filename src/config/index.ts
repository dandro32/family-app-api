const API_ROUTE: string = "/api";
const JWT_EXPIRE_ACCESS: number = 3600;
const JWT_SECRET: string = process.env.JWT_SECRET as string;

export { API_ROUTE, JWT_EXPIRE_ACCESS, JWT_SECRET };
