"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useDiaryByDate } from "@/api/hooks";
import Canvas from "@/components/Canvas";
import Loading from "@/components/Loading";

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
  } = useForm<IFormState>();
  const params = useParams<{ date: string }>();
  const router = useRouter();

  const { data, isFetching } = useDiaryByDate(params.date);

  const [updateMode, setUpdateMode] = useState(false);

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const img = canvas.toDataURL();
  };

  const handleAddButton = () => {
    router.push(`/add/${params.date}`);
  };

  useEffect(() => {
    if (data) {
      reset({
        title: data.title,
        content: data.content,
      });
    }
  }, [data]);

  if (!isFetching && !data) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center bg-gray-200 rounded-md gap-4">
        {params.date} 에 작성된 일기가 없어요!
        <button
          onClick={handleAddButton}
          className="bg-gray-800 text-[var(--main-white)] p-2 rounded-md"
        >
          일기쓰기
        </button>
      </div>
    );
  }

  return (
    <form
      className="w-full h-full flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isFetching && <Loading />}
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
  );
};

export default DiaryDetail;
