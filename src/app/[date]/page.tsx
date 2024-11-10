"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { getDiaryByDate } from "@/api/fetcher";
import Canvas from "@/components/Canvas";
import Header from "@/components/Header";
import { useParams } from "next/navigation";

export interface IFormState {
  title: string;
  content: string;
}

const DiaryDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    reset,
    getValues,
  } = useForm<IFormState>();
  const params = useParams<{ date: string }>();

  const [updateMode, setUpdateMode] = useState(false);

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const img = canvas.toDataURL();
  };

  useEffect(() => {
    getDiaryByDate(params.date, reset);
  }, []);

  return (
    <div className="flex h-screen justify-center font-pretendard">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full
       max-w-[800px] h-full flex flex-col items-center p-10 pb-16 gap-4"
      >
        <Header />
        <div className="w-full h-full flex flex-col gap-4 border-gray-300 border-[1px] rounded-md shadow-lg p-6">
          <div className="w-full flex">
            <input
              disabled={!updateMode}
              className="h-10 p-2 border-b-2 text-2xl"
              placeholder="제목"
              spellCheck="false"
              {...register("title", { required: true })}
            />
          </div>
          <Canvas updateMode={updateMode} />
          <textarea
            placeholder="내용을 입력하세요"
            spellCheck="false"
            className="h-full"
            disabled={!updateMode}
            {...register("content", { required: true })}
          />
        </div>
        <div className="flex gap-2">
          {!updateMode ? (
            <button
              disabled={!isValid}
              className="bg-gray-800 disabled:bg-gray-400 text-[var(--main-white)] w-fit p-2 rounded-md "
              onClick={() => setUpdateMode(true)}
            >
              수정하기
            </button>
          ) : (
            <button
              disabled={!isValid}
              className="bg-gray-800 disabled:bg-gray-400 text-[var(--main-white)] w-fit p-2 rounded-md "
              onClick={() => setUpdateMode(false)}
            >
              변경사항 저장하기
            </button>
          )}
          <button className="bg-rose-400 text-[var(--main-white)] w-fit p-2 rounded-md">
            삭제하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiaryDetail;
