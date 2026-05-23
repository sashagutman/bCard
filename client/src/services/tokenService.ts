import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../interfaces/users/Token";

export function decodeToken(token: string): DecodedToken {
    return jwtDecode<DecodedToken>(token);
}