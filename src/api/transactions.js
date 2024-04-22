import BACKEND_URLS from "./urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "./httpConfig";
import { toast } from "react-hot-toast";

//getallbrands
export const useGetWithdrawalTransactions = (page, limit) => {
  // console.log(storeId);
  return useQuery(
    ["getWithdrawal", page, limit],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.wallet + `?page=${page}&per_page=${limit}&include=wallet.user`)
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

// Get Other Transactions
export const useGetAllTransactions = (page, limit) => {
  // console.log(storeId);
  return useQuery(
    ["getAllTransaction", page, limit],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.transaction + `?page=${page}&per_page=${limit}&include=wallet.user`)
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
