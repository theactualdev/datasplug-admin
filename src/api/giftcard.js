import BACKEND_URLS from "./urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "./httpConfig";
import { toast } from "react-hot-toast";

//getallbrands
export const useGetGiftcardTransactions = (page, limit, search, status, type) => {
  // console.log(storeId);
  const searchTerm = search ? `&filter[reference]=${search}` : "";
  const statusTerm = status ? `&filter[status]=${status}` : "";
  const typeTerm = type ? `&filter[trade_type]=${type}` : "";
  return useQuery(
    ["getGiftcard", page, limit, search, status, type],
    async () => {
      const request = await instance
        .get(
          BACKEND_URLS.giftcard + `?page=${page}&per_page=${limit}${statusTerm}${typeTerm}${searchTerm}&include=user`
        )
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
export const useGetGiftcardInfo = (id) => {
  return useQuery(["getGiftcard", id], async () => {
    const request = instance
      .get(BACKEND_URLS.giftcard + `/${id}`)
      .then((res) => res?.data)
      .catch((err) => {
        throw err;
      });
    return request;
  });
};
