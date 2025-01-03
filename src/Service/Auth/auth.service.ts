"use server";
interface CustomJwtPayload extends JwtPayload {
  data?: {
    id: string;
    // other properties of the data object
  };
}

import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

import { jwtDecode, JwtPayload } from "jwt-decode";

import axios from "axios";
import envConfig from "@/src/config/envConfig";
import { axiosInstance } from "@/src/axios/axiosInstance";
export const createRegister = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signup", payload);
    if (data?.success) {
      const cookieStore = await cookies(); // Use cookies in server-side context
      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
export const createLogin = async (payload: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/signin", payload);
    if (data?.success) {
      const cookieStore = cookies(); // Use cookies in server-side context
      (await cookieStore).set("accessToken", data?.data?.accessToken);
      (await cookieStore).set("refreshToken", data?.data?.refreshToken);
    }
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getCurrentUser = async (): Promise<any | null> => {
  try {
    const cookieStore = cookies();
    const accessToken = (await cookieStore).get("accessToken")?.value;

    if (!accessToken) {
      console.warn("No access token found.");
      return null;
    }

    const decodedToken = await jwtDecode<CustomJwtPayload>(accessToken);
    if (decodedToken) {
      const res = await axiosInstance.get(`/user/${decodedToken?.data?.id}`);
      return res?.data?.data;
    } else {
      null;
    }
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const logoutFn = async () => {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = (await cookies()).get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};

export const forgetPasswordAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/auth/forget-password`, payload);
    return res.data; // Return response data if needed
  } catch (error) {
    throw error; // Optionally re-throw the error if you want to propagate it
  }
};

export const changePasswordAction = async (token: string, payload: any) => {
  try {
    const res = await axios.post(
      `${envConfig.baseApi}/auth/password-change`,
      payload,
      {
        headers: {
          Authorization: `${token}`, // Set the Authorization header with the token
        },
      }
    );
    if (res?.data) {
      (await cookies()).delete("accessToken");
      (await cookies()).delete("refreshToken");
    }
    return res?.data; // Return response data if needed
  } catch (error) {
    throw error; // Optionally re-throw the error if you want to propagate it
  }
};
