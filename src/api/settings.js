import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../atoms/userState";
import { instance } from "./httpConfig";

export const useSetOtp = (openModal) => {
  const user = useRecoilValue(userState);
  return useMutation(
    async () => {
      const response = await instance
        .get("/login-2FA?email=" + user.email)
        .then((res) => res?.data)
        .catch((err) => {
          throw err;
        });
      return response;
    },
    {
      onSuccess: () => {
        toast.success("Please, check your email to proceed");
        openModal(true);
        return {
          message: "Successful",
          status: 200,
        };
      },
      onError: (error) => {
        toast.error(error?.response?.data);
        openModal(false);
        return {
          message: error?.response?.data,
          status: error?.response?.status,
        };
      },
    }
  );
};

export const useSendOtp = (openModal) => {
  const setUser = useSetRecoilState(userState);

  return useMutation(
    async (data) => {
      const response = await instance
        .post("/login-2FA", data)
        .then((res) => res?.data)
        .catch((err) => {
          throw err;
        });
      return response;
    },
    {
      onSuccess: (data) => {
        toast.success("Successful");
        setUser(data);
        openModal(false);

        return {
          message: "Successful",
          status: 200,
        };
      },
      onError: (error) => {
        toast.error(error?.response?.data);
        return {
          message: error?.response?.data,
          status: error?.response?.status,
        };
      },
    }
  );
};

export const useTurnoff2FA = () => {
  const setUser = useSetRecoilState(userState);

  return useMutation(
    async () => {
      const response = await instance
        .put("/profile-2FA", { twoFactorAuthentication: false })
        .then((res) => res?.data)
        .catch((err) => {
          throw err;
        });
      return response;
    },
    {
      onSuccess: (data) => {
        toast.success("Successful");
        setUser(data);

        return {
          message: "Successful",
          status: 200,
        };
      },
      onError: (error) => {
        toast.error(error?.response?.data);
        return {
          message: error?.response?.data,
          status: error?.response?.status,
        };
      },
    }
  );
};

export const useUpdateProfile = () => {
  const setUser = useSetRecoilState(userState);

  return useMutation(
    (data) => {
      try {
        const response = toast.promise(instance.post(`/auth/profile`, data), {
          success: "Profile Updated.",
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
      onSuccess: (data) => {
        // console.log(data?.data?.data);
        setUser(data?.data?.data);
        // queryClient.invalidateQueries(["Admin"]);
      },
    }
  );
};

export const useGetAppVersion = () => {
  return useQuery(
    ["useGetAppVersion"],
    async () => {
      const request = await instance
        .get("/app-versions")
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

export const useCreateAppVersion = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post("/updates/create", data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "App version created",
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: (error) => (error?.response?.data?.message ? error?.response?.data?.message : "Something happened"),
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["useGetAppVersion"]);
      },
    }
  );
};

export const useEditAppVersion = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post("/app-versions" + `/${id}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "App version updated",
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: (error) => (error?.response?.data?.message ? error?.response?.data?.message : "Something happened"),
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["useGetAppVersion"]);
      },
    }
  );
};

// ************************SUPPORT*****************************
export const useGetSupport = () => {
  return useQuery(
    ["useGetSupport"],
    async () => {
      const request = await instance
        .get("/app-configs")
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

export const useEditSupport = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post("/app-configs" + `/${id}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Support Info updated",
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: (error) => (error?.response?.data?.message ? error?.response?.data?.message : "Something happened"),
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["useGetSupport"]);
      },
    }
  );
};

export const useGetReferralBonus = () => {
  return useQuery(
    ["ReferralBonus"],
    async () => {
      const request = await instance
        .get("/referral-bonuses")
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

export const useEditReferralBonus = (id) => {
  const queryClient = useQueryClient();

  return useMutation(
    (data) =>
      toast.promise(
        instance
          .post("/referral-bonuses" + `/${id}`, data)
          .then((res) => res.data)
          .catch((err) => {
            throw err;
          }),
        {
          success: "Referral Bonus updated",
          // success: `Store status updated.`,
          loading: "Please wait...",
          error: (error) => (error?.response?.data?.message ? error?.response?.data?.message : "Something happened"),
        },
        {
          style: {
            minWidth: "180px",
          },
        }
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["ReferralBonus"]);
      },
    }
  );
};
