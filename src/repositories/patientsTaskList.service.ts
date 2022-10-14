import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

// export const getAllPatientTasks = ({
//   page,
//   limit,
// }: {
//   page: number;
//   limit: number;
// }) => {
//   return axios.get(API_URL + "/PatientTaskList", { headers: authHeader() });
// };

export const getAllPatientTasks = () => {
  return axios.get(API_URL + `/PatientTaskList`, {
    headers: authHeader(),
  });
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/PatientTaskList/${id}`, {
    headers: authHeader(),
  });
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/PatientTaskList/Create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/PatientTaskList/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/PatientTaskList/${id}`, {
    headers: authHeader(),
  });
};
