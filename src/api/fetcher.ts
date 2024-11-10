import { Get } from ".";
import { Diary } from "./types";

/** GET : 해당 날짜의 일기 조회 */
export const getDiaryByDate = async (date: string) => {
  const res = await Get<Diary>("/api", {
    params: {
      date,
    },
  });

  return res;
};
