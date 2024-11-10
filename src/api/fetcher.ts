import { Get } from ".";
import { Diary } from "./types";

/** GET : 해당 날짜의 일기 조회 */
export const getDiaryByDate = async (date: string, reset: any) => {
  const res = await Get<Diary>("/api", {
    params: {
      date,
    },
  });

  reset({
    title: res.data.title,
    content: res.data.content,
  });

  return res;
};
