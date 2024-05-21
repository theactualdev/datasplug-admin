import BACKEND_URLS from "../urls";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../httpConfig";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(BACKEND_URLS.admins, data)
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
        .get(BACKEND_URLS.admins)
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

export const useUpdateAdminRole = (adminId, roleId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .put(BACKEND_URLS.admins + `/${adminId}/assign-role/${roleId}`)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Admin Role updated",
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

export const useToggleAdminStatus = (adminId) => {
  const queryClient = useQueryClient();

  return useMutation(
    () =>
      toast.promise(
        instance
          .put(BACKEND_URLS.admins + `/${adminId}`)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Admin Role updated",
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
        .get(BACKEND_URLS.roles + `/${id}`)
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
    }
  );
};

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(BACKEND_URLS.roles, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err?.response?.data?.message;
          }),
        {
          success: (data) => data?.message,
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: (error) => error,
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
        navigate("/roles-management");
      },
    }
  );
};

export const useUpdateRole = (id) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post(BACKEND_URLS.roles + `/${id}`, data)
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
        navigate("/roles-management");
      },
    }
  );
};

export const useDeleteRole = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .delete(BACKEND_URLS.roles + `/${id}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Role Deleted",
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
