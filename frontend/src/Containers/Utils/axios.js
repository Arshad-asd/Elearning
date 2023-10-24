import axios from "axios";
import { baseUrl } from "./urls";

const instance = axios.create({
  baseURL: `${baseUrl}`,
});

export default instance;


export const adminInstance = axios.create({
  baseURL: `${baseUrl}/api/admin`,
});


export const tutorInstance = axios.create({
  baseURL: `${baseUrl}/api/tutor`,
});
