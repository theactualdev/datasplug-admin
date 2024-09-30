import BACKEND_URLS from "../urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../httpConfig";
import { toast } from "react-hot-toast";

export const useGetAllUsers = (currentPage, size, search, status) => {
  const page = `page=${currentPage}`;
  const per_page = `per_page=${size}`;
  const searchTerm = search ? `&search=${search}` : "";
  const statusTerm = status ? `&filter[status]=${status}` : "";
  return useQuery(
    ["getAllUsers", page, size, searchTerm, statusTerm],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.users + `?${page}&${per_page}${searchTerm}${statusTerm}`)
        .then((res) => res?.data)
        .catch((err) => {
          throw err;
        });
      //   console.log(request);
      return request;
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
      retryDelay: 3000,
    }
  );
};

export const useGetSingleUser = (id) => {
  return useQuery(
    ["getSingleUser"],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.users + `/${id}?include=bankAccounts,referrals`)
        .then((res) => res?.data)
        .catch((err) => {
          throw err;
        });
      //   console.log(request);
      return request;
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
      retryDelay: 3000,
    }
  );
};

export const useUpdateUserStatus = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(BACKEND_URLS.users + `/${id}`)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "User updated",
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: "Something happened",
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries(["getAllUsers"]);
        queryClient.invalidateQueries(["getSingleUser"]);
      },
    }
  );
};

export const useMarkAsFraud = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(BACKEND_URLS.users + `/${id}/mark-as-fraudulent`)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "User Status updated",
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: "Something happened",
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries(["getAllUsers"]);
        queryClient.invalidateQueries(["getSingleUser"]);
      },
    }
  );
};

export const useFinanceUser = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(BACKEND_URLS.users + `/${id}/wallet`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: (data) => data?.message || "Successful",
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: "Something happened",
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries(["getAllUsers"]);
        queryClient.invalidateQueries(["getSingleUser"]);
      },
    }
  );
};

export const useUpdateUserType = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(BACKEND_URLS.users + `/${id}/type`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: (data) => data?.message || "Successful",
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: "Something happened",
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: (data) => {
        // console.log(data);
        queryClient.invalidateQueries(["getAllUsers"]);
        queryClient.invalidateQueries(["getSingleUser"]);
      },
    }
  );
};

export const useGetUserType = () => {
  return useQuery(
    ["UserTypes"],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.users + "/types/all")
        .then((res) => res?.data)
        .catch((err) => {
          throw err;
        });
      //   console.log(request);
      return request;
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
      retryDelay: 3000,
    }
  );
};

export const getUserOptions = async (currentPage, size, search) => {
  const searchTerm = search ? `&search=${search}` : "";
  const page = `page=${currentPage}`;
  const per_page = `per_page=${size}`;
  const request = await instance
    .get(BACKEND_URLS.users + `?${page}&${per_page}${searchTerm}${statusTerm}`)
    .then((res) => res?.data)
    .catch((err) => {
      throw err;
    });
  //   console.log(request);
  return request;
};
