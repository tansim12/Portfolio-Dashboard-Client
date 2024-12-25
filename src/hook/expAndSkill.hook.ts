import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminFindAllExpAction,
  adminFindAllSkillAction,
  adminUpdateExpAction,
  adminUpdateSkillAction,
  createExpAction,
  createSkillAction,
} from "../Service/expAndSkill.service";

export const useCreateExp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_EXP"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createExpAction(payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_EXP"] as any);
    },
  });
};

export const useAdminFindALLExp = () => {
  return useQuery({
    queryKey: ["ADMIN_FIND_ALL_EXP"],
    queryFn: async () => await adminFindAllExpAction(),
  });
};

export const useAdminUpdateExp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_EXP"],
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await adminUpdateExpAction(id, payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_EXP"] as any);
    },
  });
};

// !skill
export const useCreateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_SKILL"],
    mutationFn: async ({ payload }: { payload: any }) => {
      return await createSkillAction(payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_SKILL"] as any);
    },
  });
};

export const useAdminFindALLSkill = () => {
  return useQuery({
    queryKey: ["ADMIN_FIND_ALL_SKILL"],
    queryFn: async () => await adminFindAllSkillAction(),
  });
};

export const useAdminUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["UPDATE_EXP"],
    mutationFn: async ({ id, payload }: { id: string; payload: any }) => {
      return await adminUpdateSkillAction(id, payload);
    },
    onSuccess: (_data, _variables) => {
      queryClient.refetchQueries(["ADMIN_FIND_ALL_SKILL"] as any);
    },
  });
};
