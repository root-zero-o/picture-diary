import { getDiaryByDate, getDiaryCount } from "./fetcher";

import { useQuery } from "@tanstack/react-query";

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
