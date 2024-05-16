import BACKEND_URLS from "./urls";
import { useQuery } from "@tanstack/react-query";
import { instance } from "./httpConfig";
import axios from "axios";

export const useGetShippingWeights = () => {
  return useQuery(
    ["ShippingWeights"],
    async () => {
      const request = instance
        .get(BACKEND_URLS.auth.me + "valid-weights")
        .then((res) => res?.data)
        .catch((err) => {
          throw err;
        });
      return request;
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
      retryDelay: 3000,
    }
  );
};

export const useGetAllCountries = () => {
  return useQuery(["countries"], async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all?fields=name");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  });
};

export const useGetProductTypes = () => {
  return useQuery(["product-types"], async () => {
    try {
      const response = await instance.get("/products/types/all");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  });
};

export const useGetBanks = () => {
  return useQuery(["banks"], async () => {
    try {
      const response = await axios.get("https://api.billpadi.com/banks");
      return response.data;
    } catch (e) {
      throw new Error(e);
    }
  });
};
