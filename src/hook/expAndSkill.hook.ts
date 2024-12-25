import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  adminFindAllExpAction,
  adminUpdateExpAction,
  createExpAction,
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
