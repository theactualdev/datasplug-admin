import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { instance } from "./httpConfig";
import BACKEND_URLS from "./urls";

//getallbrands
export const useGetDepositRequest = (page = 1, limit = 100, status, search) => {
  // console.log(storeId);
  const statusTerm = status ? `&filter[status]=${status}` : "";
  const searchTerm = search ? `&filter[reference]=${search}` : "";
  //   const typeTerm = type ? `&filter[purpose]=${type}` : "";
  //   const userTerm = userId ? `&filter[user_id]=${userId}` : "";
  return useQuery(
    ["getDepositRequest", page, limit, status, search],
    async () => {
      const request = await instance
        .get(`deposit-requests?page=${page}&per_page=${limit}${statusTerm}${searchTerm}&include=user`)
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

export const useUpdateDepositRequestStatus = (transactionID, status) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(`/deposit-requests/${transactionID}/action/${status}`, data)
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
        queryClient.invalidateQueries(["getDepositRequest"]);
      },
    }
  );
};

export const useUpdateDepositAmount = (transactionID) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(`/deposit-requests/${transactionID}`, data)
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
        queryClient.invalidateQueries(["getDepositRequest"]);
      },
    }
  );
};

//getallbrands
export const useGetWithdrawalRequest = (page, limit, status, search) => {
  // console.log(storeId);
  const statusTerm = status ? `&filter[status]=${status}` : "";
  const searchTerm = search ? `&filter[reference]=${search}` : "";
  //   const typeTerm = type ? `&filter[purpose]=${type}` : "";
  //   const userTerm = userId ? `&filter[user_id]=${userId}` : "";
  return useQuery(
    ["getDepositRequest", page, limit, status, search],
    async () => {
      const request = await instance
        .get(`withdrawal-requests?page=${page}&per_page=${limit}${statusTerm}${searchTerm}&include=user`)
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

export const useUpdateWithdrawalRequestStatus = (transactionID, status) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(`/withdrawal-requests/${transactionID}/action/${status}`, data)
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
        queryClient.invalidateQueries(["getDepositRequest"]);
      },
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

export const useInitiateWithdrawalRequest = (transactionID, provider) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(`/withdrawal-requests/${transactionID}/transfer/${provider}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err?.response?.data;
          }),
        {
          success: (data) => data?.message,
          loading: "Please wait...",
          error: (error) => error?.message,
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["getDepositRequest"]);
      },
    }
  );
};

export const useAuthorizeWithdrawalRequest = (transactionID, provider) => {
  const queryClient = useQueryClient();
  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(`/withdrawal-requests/${transactionID}/transfer/monnify/authorize`, data)
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
        queryClient.invalidateQueries(["getDepositRequest"]);
      },
    }
  );
};
