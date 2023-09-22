import axios from "axios";
import { env } from "~/env.mjs";

const api = axios.create({
  baseURL: `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/auth/local`,
  withCredentials: true,
});

export const getLogin = async (data:any) => {
  const res = await api.post("/login", data);
  return res.data.data;
};
