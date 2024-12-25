import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminFindAllBlogAction,
  adminFindAllProjectAction,
  adminUpdateBlogAction,
  adminUpdateProjectAction,
  createBlogAction,
  createProjectAction,
} from "../Service/projectAndBlog.service";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_PROJECT"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createProjectAction(payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_PROJECT"] as any);
    },
  });
};

export const useAdminFindALLProject = () => {
  return useQuery({
    queryKey: ["ADMIN_FIND_ALL_PROJECT"],
    queryFn: async () => await adminFindAllProjectAction(),
  });
};

export const useAdminUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_PROJECT"],
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await adminUpdateProjectAction(id, payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_PROJECT"] as any);
    },
  });
};

// !Blog
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_BLOG"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createBlogAction(payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_BLOG"] as any);
    },
  });
};

export const useAdminFindALLBlog = () => {
  return useQuery({
    queryKey: ["ADMIN_FIND_ALL_BLOG"],
    queryFn: async () => await adminFindAllBlogAction(),
  });
};

export const useAdminUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_EXP"],
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await adminUpdateBlogAction(id, payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_BLOG"] as any);
    },
  });
};
