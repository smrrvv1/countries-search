import axios from "axios";
import { BASE_URL } from "./constants";

export const axiosApi = axios.create({
    baseURL: BASE_URL,
  });