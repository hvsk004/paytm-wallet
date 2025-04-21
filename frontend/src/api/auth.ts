import { ILoginData, ISignupData } from "../types";
import { api, authApi } from "./axios";

export async function signup({
  firstName,
  lastName,
  username,
  password,
}: ISignupData) {
  const response = await authApi.post("/user/signup", {
    firstName,
    lastName,
    username,
    password,
  });
  return response;
}

export async function login({ username, password }: ILoginData) {
  const response = await authApi.post("/user/login", {
    username,
    password,
  });
  return response;
}

export async function getUserDetails() {
  const response = await api.get("/user/getUser");

  return response;
}
