import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { userState } from "../atoms/userState";
import { instance } from "./httpConfig";
import BACKEND_URLS from "./urls";

export const useLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectPath = location.state?.path || "/";
  const setUser = useSetRecoilState(userState);
  const inOneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
  // const inTenSeconds = new Date(new Date().getTime() + 10000);

  return useMutation(
    async (values) => {
      const request = await instance
        .post(BACKEND_URLS.auth.login, values)
        .then((res) => res.data)
        .catch((err) => {
          throw err?.response?.data?.message;
        });
      return request;
    },
    {
      onSuccess: (data) => {
        // console.log(data);
        toast.success(data?.message);
        setUser(data?.data?.user);
        Cookies.set("access_token", data?.data?.token, { expires: 1 });
        Cookies.set("refresh_token", data?.data?.token, { expires: 1 });
        navigate(redirectPath);
      },
      onError: (error) => {
        if (error) {
          console.error(error);
          return error;
        }
      },
    }
  );
};

export const useForgotPassword = (email) => {
  const navigate = useNavigate();

  return useMutation(
    async (values) => {
      const request = await instance
        .patch(BACKEND_URLS.auth.forgotPassword, values)
        .then((res) => res.data)
        .catch((err) => {
          // console.log(err);
          throw err.response.data;
        });
      return request;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        navigate(`/auth-change-password?email=${email}`);
      },
      onError: (error) => {
        if (error) {
          toast.error(error.message);
          console.error(error);
          Promise.reject(error);
        }
      },
    }
  );
};

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation(
    async (values) => {
      const request = await instance
        .post(BACKEND_URLS.auth.resetPassword, values)
        .then((res) => res.data)
        .catch((err) => {
          throw err.response.data;
        });
      return request;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        navigate("/auth-login");
      },
      onError: (error) => {
        if (error) {
          toast.error(error.message);
          console.error(error);
          Promise.reject(error);
        }
      },
    }
  );
};

export const useChangePassword = () => {
  return useMutation(
    async (values) => {
      const request = await instance
        .post(BACKEND_URLS.auth.changePassword, values)
        .then((res) => res.data)
        .catch((err) => {
          throw err.response.data;
        });
      return request;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        // navigate("/auth-login");
      },
      onError: (error) => {
        if (error) {
          toast.error(error.message);
          console.error(error);
          Promise.reject(error);
        }
      },
    }
  );
};

export const useSendResetOtp = (email) => {
  const navigate = useNavigate();
  // const setUser = useSetRecoilState(userState);

  return useMutation(
    async (data) => {
      const response = await instance
        .post("/auth/password/resend", data)
        .then((res) => res?.data)
        .catch((err) => {
          throw err;
        });
      return response;
    },
    {
      onSuccess: (data) => {
        toast.success(data?.message);
        navigate(`/auth-change-password?email=${email}`);
        // setUser(data);
        // openModal(false);

        // return {
        //   message: "Successful",
        //   status: 200,
        // };
      },
      onError: (error) => {
        if (error) {
          toast.error(error.message);
          console.error(error);
          Promise.reject(error);
        }
      },
    }
  );
};

export const useGetUser = () => {
  const setUser = useSetRecoilState(userState);
  return useQuery(
    ["Admin"],
    async () => {
      const request = instance
        .get("/auth/user")
        .then((res) => console.log(res?.data))
        .catch((err) => {
          throw err;
        });
      return request;
    },
    {
      retry: false,
    }
  );
};

export const useRefreshToken = async () => {
  const inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
  // const navigate = useNavigate();
  const refreshToken = Cookies.get("refresh_token");
  const data = { refreshToken };
  try {
    const response = await instance.post(BACKEND_URLS.auth.refreshToken, data);
    Cookies.set("access_token", response.data.accesstoken, { expires: 1 });
  } catch (error) {
    if (error.response.status === 400) {
      console.error(error);
      Cookies.remove("refresh_token");
      Cookies.remove("access_token");
      window.location.pathname = "/auth-login";
    }
    console.error(error);
    Promise.reject(error);
  }
};

export const useLogout = () => {
  const navigate = useNavigate();
  const resetUser = useResetRecoilState(userState);
  return useMutation(
    async () => {
      return instance
        .post(BACKEND_URLS.auth.logout)
        .then((res) => res.data)
        .catch((err) => {
          throw err;
        });
    },
    {
      onSuccess: () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        resetUser();
        navigate("/auth-login", { replace: true });
      },
      onError: (err) => {
        console.error(err);
        Promise.reject(err);
      },
    }
  );
};
