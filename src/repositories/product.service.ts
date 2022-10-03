import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "~/config/axios";

export const getAllProducts = ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  return axios.post(
    API_URL + "/Product/search",
    {
      pageSize: limit,
      pageNumber: page + 1,
    },
    { headers: authHeader() }
  );
};

export const Get = (id: string) => {
  return axios.get(API_URL + `/Product/${id}`, {
    headers: authHeader(),
  });
};

export const Create = (data: any) => {
  return axios.post(API_URL + "/Product/Create", data, {
    headers: authHeader(),
  });
};

export const Modify = (id: string, data: any) => {
  return axios.put(API_URL + `/Product/update?id=${id}`, data, {
    headers: authHeader(),
  });
};

export const Delete = (id: number) => {
  return axios.delete(API_URL + `/Product/${id}`, {
    headers: authHeader(),
  });
};
export const GetCategoryList = () => {
  return axios.get(API_URL + `/DDLList/DDLList`, {
    headers: authHeader(),
  });
};
