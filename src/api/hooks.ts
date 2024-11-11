import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createDiary,
  deleteDiary,
  getDiaryByDate,
  getDiaryCount,
  updateDiary,
} from "./fetcher";

import { useRouter } from "next/navigation";

export const useDiaryByDate = (date: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ["getDiaryByDate", date] as const,
    queryFn: () => getDiaryByDate(date),
    meta: {
      errorMessage: "날짜별 일기 조회 실패! 다시 시도해주세요",
    },
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
    meta: {
      errorMessage: "일기 작성현황 조회 실패! 다시 시도해주세요",
    },
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
  const { mutate, isPending } = useMutation({
    mutationFn: createDiary,
    onSuccess: () => {
      alert("일기 쓰기 완료!");
      queryClient.resetQueries();
      router.push(`/${date}`);
    },
    onError: (e: AxiosError<{ error: string }>) => {
      alert(e.response?.data?.error);
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
