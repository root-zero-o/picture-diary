import { Delete, Get, Patch, Post } from ".";

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

/** GET : 해당 달의 일기 유무 조회 */
export const getDiaryCount = async (month: string) => {
  const res = await Get<{ date: string }[]>("/api/all", {
    params: {
      month,
    },
  });

  return res;
};

/** POST : 일기 생성하기 */
export const createDiary = async (body: Omit<Diary, "id">) => {
  const res = await Post<{ id: number }, Omit<Diary, "id">>("/api", body);
  return res;
};

/** DELETE : 일기 삭제하기 */
export const deleteDiary = async (date: string) => {
  const res = await Delete<{ success: boolean }>("/api", {
    params: {
      date,
    },
  });

  return res;
};

/** PATCH : 일기 수정하기 */
export const updateDiary = async (body: Omit<Diary, "id">) => {
  const res = await Patch<{ success: boolean }, Omit<Diary, "id">>(
    "/api",
    body
  );

  return res;
};
