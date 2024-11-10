import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import {
  createDiary,
  deleteDiary,
  getDiaryByDate,
  getDiaryCount,
  updateDiary,
} from "./fetcher";

import { useRouter } from "next/navigation";
import { Diary } from "./types";

export const useDiaryByDate = (date: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ["getDiaryByDate", date] as const,
    queryFn: () => getDiaryByDate(date),
  });

  return {
    data: data?.data,
    isFetching,
  };
};

export const useDiaryCount = (month: string) => {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ["getDiaryCount", month] as const,
    queryFn: () => getDiaryCount(month),
  });

  return {
    data: data?.data,
    isFetching,
    refetch,
  };
};

export const useCreateDiary = (date: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation<
    AxiosResponse<{ id: number }>,
    AxiosError<any>,
    Omit<Diary, "id">
  >({
    mutationFn: createDiary,
    onSuccess: () => {
      alert("일기 쓰기 완료!");
      queryClient.resetQueries();
      router.push(`/${date}`);
    },
    onError: (e) => {
      alert(e.response?.data.error);
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useDeleteDiary = (date: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteDiary,
    onSuccess: () => {
      alert("일기 삭제 완료!");
      queryClient.resetQueries();
      router.push(`/add/${date}`);
    },
    onError: () => {
      alert("삭제 실패! 다시 시도해주세요");
    },
  });

  return {
    mutate,
    isPending,
  };
};

export const useUpdateDiary = (date: string, onSuccess: () => void) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateDiary,
    onSuccess: () => {
      alert("일기 수정 완료!");
      queryClient.resetQueries();
      onSuccess();
    },
    onError: () => {
      alert("일기 수정 실패! 다시 시도해주세요");
    },
  });

  return {
    mutate,
    isPending,
  };
};
