import { IFormState } from "@/app/[date]/page";
import { UseFormReset } from "react-hook-form";
import { Get } from ".";
import { Diary } from "./types";

/** GET : 해당 날짜의 일기 조회 */
export const getDiaryByDate = async (
  date: string,
  reset: UseFormReset<IFormState>
) => {
  const res = await Get<Diary>("/api", {
    params: {
      date,
    },
  });

  if (res.data) {
    reset({
      title: res.data.title,
      content: res.data.content,
    });
  }
  return res;
};
