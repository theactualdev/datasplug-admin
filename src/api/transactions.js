import BACKEND_URLS from "./urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "./httpConfig";
import { toast } from "react-hot-toast";

//getallbrands
export const useGetWithdrawalTransactions = (page, limit, status, search, type, userId) => {
  // console.log(storeId);
  const statusTerm = status ? `&filter[status]=${status}` : "";
  const searchTerm = search ? `&filter[reference]=${search}` : "";
  const typeTerm = type ? `&filter[purpose]=${type}` : "";
  const userTerm = userId ? `&filter[user_id]=${userId}` : "";
  return useQuery(
    ["getWithdrawal", page, limit, status, search, type, userId],
    async () => {
      const request = await instance
        .get(
          BACKEND_URLS.wallet +
            `?page=${page}&per_page=${limit}${statusTerm}${searchTerm}${typeTerm}${userTerm}&include=wallet.user`
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
export const useGetAllTransactions = (page, limit, purpose = "", status, search, userId) => {
  // console.log(storeId);
  const purposeTerm = purpose ? `&filter[purpose]=${purpose}` : "";
  const statusTerm = status ? `&filter[status]=${status}` : "";
  const searchTerm = search ? `&filter[reference]=${search}` : "";
  const userTerm = userId ? `&filter[user_id]=${userId}` : "";

  return useQuery(
    ["getAllTransaction", page, limit, purpose, status, search, userId],
    async () => {
      const request = await instance
        .get(
          BACKEND_URLS.transaction +
            `?page=${page}&per_page=${limit}${purposeTerm}${statusTerm}${searchTerm}${userTerm}&include=wallet.user`
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

export const useUpdateWalletDepositAmount = (transactionID) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(`/wallet/transactions/${transactionID}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err.response.data;
          }),
        {
          success: (data) => data.message,
          loading: "Please wait...",
          error: (error) => error.message,
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getWithdrawal"]);
      },
    }
  );
};

export const useUpdateWithdrawalWalletStatus = (transactionID, status) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(`/wallet/transactions/${transactionID}/action/${status}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err.response.data;
          }),
        {
          success: (data) => data.message,
          loading: "Please wait...",
          error: (error) => error.message,
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getWithdrawal"]);
      },
    }
  );
};
