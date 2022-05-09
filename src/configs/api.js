import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://api-waysbook.dhohirpradana.com/api/v1",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.commin["Authorization"];
  }
};
