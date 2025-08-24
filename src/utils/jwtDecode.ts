import { jwtDecode } from "jwt-decode";

export function decodeJwt(token: string | null) {
  if (!token) {
    return null
  }
  try {
    interface DecodedToken {
      id: string,
      role: string,
      iat: number,
      exp: number,
    }

    return jwtDecode<DecodedToken>(token)
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

