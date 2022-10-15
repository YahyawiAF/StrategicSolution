import axios from "axios";
import { API_URL } from "~/config/axios";

// export const register = (username: string, email: string, password: string) => {
//   return axios.post(API_URL + "signup", {
//     username,
//     email,
//     password,
//   });
// };

export const loginService = (userName: string, password: string) => {
  return axios
    .post(API_URL + "/Account/login", {
      userName,
      password,
    })
    .then(response => {
      if (response.data.accessToken) {
        sessionStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  sessionStorage.removeItem("user");
};

// export const getCurrentUser = () => {
//   const userStr = sessionStorage.getItem("user");
//   if (userStr) return JSON.parse(userStr);

//   return null;
// };
