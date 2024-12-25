"use server";
import { axiosInstance } from "../axios/axiosInstance";

export const createProjectAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/projectAndBlog/project`, payload);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminFindAllProjectAction = async () => {
  try {
    const res = await axiosInstance.get(`/projectAndBlog/project/admin`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminUpdateProjectAction = async (id: any, payload: any) => {
  try {
    const res = await axiosInstance.put(
      `/projectAndBlog/project/admin/${id}`,
      payload
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

//! Blog
export const createBlogAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/projectAndBlog/blog`, payload);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminFindAllBlogAction = async () => {
  try {
    const res = await axiosInstance.get(`/projectAndBlog/blog/admin`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminUpdateBlogAction = async (id: any, payload: any) => {
  try {
    const res = await axiosInstance.put(
      `/projectAndBlog/blog/admin/${id}`,
      payload
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
