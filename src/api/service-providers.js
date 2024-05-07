import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { instance } from "./httpConfig";
import toast from "react-hot-toast";
import BACKEND_URLS from "./urls";

export const useGetProviders = (currentPage = 1, size = 100) => {
  const page = `page=${currentPage}`;
  const per_page = `per_page=${size}`;
  return useQuery(
    ["Providers", page, size],
    async () => {
      try {
        const response = await instance.get(BACKEND_URLS.providers + `?${page}&${per_page}`);
        // console.log(response.data.data);
        // toast.success(response.data.message);
        return response.data;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      // initialData: [],
      retry: 1,
      retryDelay: 3000,
      refetchOnWindowFocus: false,
      keepPreviousData: true,
      staleTime: 5000,
    }
  );
};

// Get product Info
export const useGetProviderInfo = (id) => {
  return useQuery(["Providers", id], async () => {
    const request = instance
      .get(BACKEND_URLS.providers + `/${id}`)
      .then((res) => res?.data)
      .catch((err) => {
        throw err;
      });
    return request;
  });
};

export const useCreateProviders = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (values) => {
      try {
        const response = toast.promise(instance.post(BACKEND_URLS.providers, values), {
          success: "Account created",
          loading: "Please wait...",
          error: (error) => error?.response?.data?.message || "Failed. Something happened.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Providers"]);
      },
    }
  );
};

export const useUpdateProviders = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (values) => {
      try {
        const response = toast.promise(instance.post(BACKEND_URLS.providers + `/${id}`, values), {
          success: (data) => data.message || "Update Successful",
          loading: "Please wait...",
          error: (error) => error?.response?.data?.message || "Failed. Something happened.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Providers"]);
      },
    }
  );
};
export const useUpdateProviderProduct = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (values) => {
      try {
        const response = toast.promise(instance.post(BACKEND_URLS.product + `/${id}`, values), {
          success: (data) => data.message || "Update Successful",
          loading: "Please wait...",
          error: (error) => error?.response?.data?.message || "Failed. Something happened.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Providers"]);
      },
    }
  );
};
export const useVerifyAccount = (formData, setFormData) => {
  const queryClient = useQueryClient();

  return useMutation(
    (values) => {
      try {
        const response = toast.promise(instance.post(BACKEND_URLS.providers + `/verify`, values), {
          success: (data) => data?.data?.message || "Update Successful",
          loading: "Please wait...",
          error: (error) => error?.response?.data?.message || "Failed. Something happened.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: (data) => {
        setFormData({ ...formData, account_name: data?.data?.data?.account_name });
      },
    }
  );
};

export const useDeleteProviders = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      try {
        const response = toast.promise(instance.delete(BACKEND_URLS.providers + `/${id}`), {
          success: "Account deleted.",
          loading: "Please wait...",
          error: "Failed: an error occured.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Providers"]);
      },
    }
  );
};

export const useToggleProviders = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(BACKEND_URLS.providers + `/${id}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err.response.data;
          }),
        {
          success: (data) => data.message,
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: (error) => error?.message || "Something happened",
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["Providers"]);
      },
    }
  );
};
