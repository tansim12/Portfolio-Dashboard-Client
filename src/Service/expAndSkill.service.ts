"use server";
import { axiosInstance } from "../axios/axiosInstance";

export const createExpAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/expAndSkill/experience`, payload);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminFindAllExpAction = async () => {
  try {
    const res = await axiosInstance.get(`/expAndSkill/experience/admin`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminUpdateExpAction = async (id: any, payload: any) => {
  try {
    const res = await axiosInstance.put(
      `/expAndSkill/experience/admin/${id}`,
      payload
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};

//! skill
export const createSkillAction = async (payload: any) => {
  try {
    const res = await axiosInstance.post(`/expAndSkill/skill`, payload);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminFindAllSkillAction = async () => {
  try {
    const res = await axiosInstance.get(`/expAndSkill/skill/admin`);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
export const adminUpdateSkillAction = async (id: any, payload: any) => {
  try {
    const res = await axiosInstance.put(
      `/expAndSkill/skill/admin/${id}`,
      payload
    );
    return res?.data?.data;
  } catch (error) {
    console.log(error);
  }
};
