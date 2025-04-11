import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number; // Expiration time as a UNIX timestamp
  [key: string]: any;
}

export const validateCognitoToken = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp > currentTime; // true if token is still valid
  } catch (error) {
    return false;
  }
};
