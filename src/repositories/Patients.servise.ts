import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllPatient = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/Patient/search",
    {
      pageSize: limit,
      pageNumber: page + 1,
    },
    { headers: authHeader() }
  );
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/Patient/${id}`, {
    headers: authHeader(),
  });
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/Patient/Create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/Patient/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/Patient/${id}`, {
    headers: authHeader(),
  });
};
