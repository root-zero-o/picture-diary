import { useQuery } from "@tanstack/react-query";
import { getDiaryByDate } from "./fetcher";

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
