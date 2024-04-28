import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { instance } from "./httpConfig";
import toast from "react-hot-toast";

const faq_endpoint = "/faq";
const faq_category_endpoint = "/bundle";

export const useGetFaqs = (currentPage = 1, size = 100) => {
  const page = `page=${currentPage}`;
  const per_page = `per_page=${size}`;
  return useQuery(
    ["faqs", page, size],
    async () => {
      try {
        const response = await instance.get(`/faqs?${page}&${per_page}&include=faqCategory`);
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

export const useGetFaqCategories = (currentPage = 1, size = 100) => {
  const page = `page=${currentPage}`;
  const per_page = `per_page=${size}`;
  return useQuery(
    ["faq-categories", page, size],
    async () => {
      try {
        // const response = await instance.get(`/faq/category?page=${page}&size=${size}`);
        const response = await instance.get(`/faq-categories?${page}&${per_page}`);
        // console.log(response.data.data);
        // toast.success(response.data.message);
        return response.data;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      retry: 1,
      retryDelay: 3000,
      refetchOnWindowFocus: false,
    }
  );
};

// export const useGetPackageById = (id) => {
//   return useQuery(
//     ["packages", id],
//     async () => {
//       try {
//         const response = await instance.get(`${package_endpoint}/${id}`);
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//         Promise.reject(error);
//       }
//     },
//     {
//       initialData: [],
//       retry: 1,
//       retryDelay: 3000,
//       refetchOnWindowFocus: false,
//     }
//   );
// };

export const useCreateFaq = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (values) => {
      try {
        const response = toast.promise(instance.post(`/faqs`, values), {
          success: "Faq created",
          loading: "Please wait...",
          error: "Failed: An error occured.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["faqs"]);
      },
    }
  );
};

export const useCreateFaqCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (values) => {
      try {
        const response = toast.promise(instance.post("/faq-categories", values), {
          success: "Faq category created",
          loading: "Please wait...",
          error: "Failed: An error occured.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["faq-categories"]);
      },
    }
  );
};

export const useUpdateFaq = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (values) => {
      try {
        const response = toast.promise(instance.post(`/faqs/${id}`, values), {
          success: (data) => data.message || "Update Successful",
          loading: "Please wait...",
          error: "Something happened.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["faqs"]);
      },
    }
  );
};

export const useUpdateFaqCategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (values) => {
      try {
        const response = toast.promise(instance.post(`/faq-categories/${id}`, values), {
          success: "Update successful",
          loading: "Please wait...",
          error: "Something happened.",
        });
        return response;
      } catch (error) {
        console.error(error);
        Promise.reject(error);
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["faq-categories"]);
      },
    }
  );
};

export const useDeleteFaq = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      try {
        const response = toast.promise(instance.delete(`/faqs/${id}`), {
          success: "Faq deleted.",
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
        queryClient.invalidateQueries(["faqs"]);
      },
    }
  );
};

export const useDeleteFaqCategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      try {
        const response = toast.promise(instance.delete(`/faq-categories/${id}`), {
          success: "Faq category deleted.",
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
        queryClient.invalidateQueries(["faq-categories"]);
      },
    }
  );
};

export const useToggleFaqCategory = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(`/faq-categories/${id}`, data)
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
        queryClient.invalidateQueries(["faq-categories"]);
      },
    }
  );
};
