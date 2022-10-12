import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllPatientInsurance = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/PatientInsurance/search",
    {
      pageSize: limit,
      pageNumber: page + 1,
    },
    { headers: authHeader() }
  );
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/PatientInsurance/${id}`, {
    headers: authHeader(),
  });
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/PatientInsurance/Create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/PatientInsurance/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/PatientInsurance/${id}`, {
    headers: authHeader(),
  });
};
