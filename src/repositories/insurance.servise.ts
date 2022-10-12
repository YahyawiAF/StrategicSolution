import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllInsurances = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/Insurance/search",
    {
      pageSize: limit,
      pageNumber: page + 1,
    },
    { headers: authHeader() }
  );
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/Insurance/${id}`, {
    headers: authHeader(),
  });
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/Insurance/Create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/Insurance/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/Insurance/${id}`, {
    headers: authHeader(),
  });
};
