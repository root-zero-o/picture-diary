import { AxiosRequestConfig, AxiosResponse } from "axios";

import { Axios } from "./axios";

export const Get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await Axios.get(url, config);
  return response;
};

export const Post = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await Axios.post(url, data, config);
  return response;
};

export const Patch = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await Axios.patch(url, data, config);
  return response;
};

export const Delete = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  const response = await Axios.delete(url, config);
  return response;
};
