import {jwtDecode} from "jwt-decode";

export function isAccessTokenExpired(token: string) {
  const decoded: { exp: number } = jwtDecode(token);
  const expiry = decoded.exp * 1000;
  const now = Date.now();

  
  return now >= expiry - 30_000;
}
