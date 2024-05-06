import BACKEND_URLS from "./urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "./httpConfig";
import { toast } from "react-hot-toast";

//getallbrands
export const useGetWithdrawalTransactions = (page, limit, status, search, type = "transfer") => {
  // console.log(storeId);
  const statusTerm = status ? `&filter[status]=${status}` : "";
  const searchTerm = search ? `&filter[reference]=${search}` : "";
  const typeTerm = type ? `&filter[purpose]=${type}` : "";
  return useQuery(
    ["getWithdrawal", page, limit, status, search, type],
    async () => {
      const request = await instance
        .get(
          BACKEND_URLS.wallet +
            `?page=${page}&per_page=${limit}${statusTerm}${searchTerm}${typeTerm}&include=wallet.user`
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

// Get Other Transactions
export const useGetAllTransactions = (page, limit, purpose = "", status, search) => {
  // console.log(storeId);
  const purposeTerm = purpose ? `&filter[purpose]=${purpose}` : "";
  const statusTerm = status ? `&filter[status]=${status}` : "";
  const searchTerm = search ? `&filter[reference]=${search}` : "";

  return useQuery(
    ["getAllTransaction", page, limit, purpose, status, search],
    async () => {
      const request = await instance
        .get(
          BACKEND_URLS.transaction +
            `?page=${page}&per_page=${limit}${purposeTerm}${statusTerm}${searchTerm}&include=wallet.user`
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
