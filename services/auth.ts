import api from "../api";
import { User } from "../interfaces/User";

// Login
export async function login(email: string, password: string) {
  return api.post<{ authToken: string }>("token/login/", {
    email,
    password,
  });
}

// Get user info
export async function getUserInfo() {
  return api.get<User>("users/me/");
}
