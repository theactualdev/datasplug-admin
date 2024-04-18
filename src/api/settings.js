import { useMutation } from "@tanstack/react-query";
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
    async (data) => {
      const response = await instance
        .put("/profile", data)
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
