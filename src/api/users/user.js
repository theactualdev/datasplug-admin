import BACKEND_URLS from "../urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../httpConfig";
import { toast } from "react-hot-toast";

export const useGetAllUsers = (page, limit, search) => {
  const searchTerm = search ? `&search=${search}` : "";
  return useQuery(
    ["getAllUsers", page, limit, searchTerm],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.users + `?page=${page}&limit=${limit}${searchTerm}`)
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
        .get(BACKEND_URLS.users + `?id=${id}`)
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

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(BACKEND_URLS.users, data)
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
      },
    }
  );
};
