import axios from "axios";
import { env } from "~/env.mjs";

const baseURL = env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const getItem = async (url: string) => {
  const res = await axios.get(`${baseURL}/api${url}`);
  return res.data.data;
};

export const addItem = async (data: any, url: string) => {
  const res = await axios.post(`${baseURL}/api${url}`, data,{withCredentials:true});
  return res.data;
};
export const editItem = async (data: any, url: string) => {
  const res = await axios.put(`${baseURL}/api${url}`, data,{
    withCredentials:true
  });
  return res.data;
};
export const deleteItem = async (id: string, url: string) => {
  const res = await axios.delete(`${baseURL}/api${url}/${id}`);
  return res.data.data;
};
