import axios from "axios";

export const createRequest = axios.create({
    baseURL: "http://localhost:8080/api/",
    withCredentials: true,
});