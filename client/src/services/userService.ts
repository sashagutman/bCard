import axios from "axios";
import { User } from "../interfaces/users/User";
import { decodeToken } from "../services/tokenService";
import { UserLogin } from "../interfaces/users/UserLogin";
import { DecodedToken } from "../interfaces/users/Token";


const API: string = import.meta.env.VITE_USERS_API;

// Register new user
export function registerUser(normalizedUser: User) {
  return axios.post(API, normalizedUser);
}

// get user by id
export function getUserById(id: string) {
  return axios.get(`${API}/${id}`, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
}

// update user by id
export function updateUser(id: string, updatedUser: Partial<User>) {
  return axios.put(`${API}/${id}`, updatedUser, {
    headers: {
      "x-auth-token": localStorage.getItem("token"),
    },
  });
}


// login user
export async function loginUser(user: UserLogin): Promise<{ token: string; isBusiness: boolean }> {
  const res = await axios.post(`${API}/login`, user);
  console.log("API Response:", res.data);

  let token: string;
if (typeof res.data === "string") {
    token = res.data; 
} else if (res.data.token) {
    token = res.data.token;
} else {
    throw new Error("Token not received");
}
  let isBusiness: boolean = false;

  try {
      const decoded: DecodedToken = decodeToken(token);
      isBusiness = decoded.isBusiness === true;
      console.log("Decoded Token:", decoded);
  } catch (error) {
      console.error("Failed to decode token:", error);
  }

  localStorage.setItem("token", token);
  localStorage.setItem("isBusiness", isBusiness.toString());

  return { token, isBusiness };
}


