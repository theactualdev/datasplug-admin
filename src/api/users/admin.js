import BACKEND_URLS from "../urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../httpConfig";
import { toast } from "react-hot-toast";

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(BACKEND_URLS.me, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Admin created",
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
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllAdmin"]);
      },
    }
  );
};

export const useGetAllAdmin = (page, limit) => {
  return useQuery(
    ["getAllAdmin", page, limit],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.auth.me + `?page=${page}&limit=${limit}`)
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

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(BACKEND_URLS.me, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Admin updated",
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
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllAdmin"]);
      },
    }
  );
};

export const useGetAllRoles = (page, limit) => {
  return useQuery(
    ["getAllRoles", page, limit],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.roles + `?page=${page}&limit=${limit}`)
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

export const useGetRoles = () => {
  return useQuery(
    ["getAllRoles"],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.roles)
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

export const useGetRoleById = (id = "") => {
  return useQuery(
    ["getAllRoles", id],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.roles + `?roleId=${id}`)
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
      initialData: [],
    }
  );
};

export const useGetAllPermissions = () => {
  return useQuery(
    ["useGetAllPermissions"],
    async () => {
      const request = await instance
        .get(BACKEND_URLS.permissions)
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
      initialData: [],
    }
  );
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(BACKEND_URLS.roles, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Role created",
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
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllRoles"]);
      },
    }
  );
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(BACKEND_URLS.roles, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Role updated",
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
      onSuccess: () => {
        queryClient.invalidateQueries(["getAllRoles"]);
      },
    }
  );
};

export const useGetServiceCharge = () => {
  return useQuery(
    ["useGetOtherSettings"],
    async () => {
      const request = await instance
        .get("/service-charges")
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

export const useUpdateServiceCharge = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(`/service-charges/${id}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Charge updated",
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
      onSuccess: () => {
        queryClient.invalidateQueries(["useGetOtherSettings"]);
      },
    }
  );
};
