import BACKEND_URLS from "./urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "./httpConfig";
import { toast } from "react-hot-toast";

//getallbrands
export const useGetAssetsTransactions = (page, limit) => {
  // console.log(storeId);
  return useQuery(
    ["getAssets", page, limit],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.crypto + `?page=${page}&per_page=${limit}&include=user`)
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

// Get product Info
export const useGetAssetInfo = (id) => {
  return useQuery(["getAssets", id], async () => {
    const request = instance
      .get(BACKEND_URLS.crypto + `/${id}`)
      .then((res) => res?.data)
      .catch((err) => {
        throw err;
      });
    return request;
  });
};
