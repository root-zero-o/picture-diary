import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { createDiary, getDiaryByDate, getDiaryCount } from "./fetcher";

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
  const { data, isFetching } = useQuery({
    queryKey: ["getDiaryCount", month] as const,
    queryFn: () => getDiaryCount(month),
  });

  return {
    data: data?.data,
    isFetching,
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
