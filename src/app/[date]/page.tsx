"use client";

import { useDeleteDiary, useDiaryByDate, useUpdateDiary } from "@/api/hooks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import Canvas from "@/components/Canvas";
import Loading from "@/components/Loading";
import Preview from "@/components/Preview";
import { format } from "date-fns";

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
  const [updateMode, setUpdateMode] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const { data, isFetching } = useDiaryByDate(params.date);
  const { mutate: del, isPending: delPending } = useDeleteDiary(params.date);
  const { mutate: update, isPending: updatePending } = useUpdateDiary(
    params.date,
    () => setUpdateMode(false)
  );

  const handleUpdate: SubmitHandler<IFormState> = (data) => {
    if (!updateMode) return;
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const img = canvas.toDataURL();

    update({
      title: data.title,
      content: data.content,
      date: params.date,
      picture: img,
    });
  };

  const handleAddButton = () => {
    router.push(`/add/${params.date}`);
  };

  const handleDeleteButton = () => {
    del(params.date);
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
      <div className="w-full h-full min-h-[500px] flex flex-col justify-center items-center bg-gray-200 rounded-md gap-4">
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
    <>
      <form className="form">
        {isFetching && <Loading />}
        <div className="page-container">
          <span className="text-md text-gray-500">
            {format(new Date(params.date), "yyyy년 M월 d일")}
          </span>
          <div className="w-full flex">
            <input
              disabled={!updateMode}
              className="h-10 p-2 border-b-2 text-2xl"
              placeholder="제목"
              spellCheck="false"
              {...register("title", { required: true })}
            />
          </div>
          <Canvas updateMode={updateMode} picture={data?.picture || null} />
          <textarea
            placeholder="내용을 입력하세요"
            spellCheck="false"
            className="h-full min-h-40"
            disabled={!updateMode}
            {...register("content", { required: true })}
          />
        </div>
        <div className="flex gap-2">
          {!updateMode ? (
            <button
              disabled={!isValid || updatePending}
              className="page-btn"
              onClick={handleSubmit(() => setUpdateMode(true))}
              type="button"
            >
              수정하기
            </button>
          ) : (
            <button
              disabled={!isValid}
              className="page-btn"
              type="submit"
              onClick={handleSubmit(handleUpdate)}
            >
              변경사항 저장하기
            </button>
          )}

          <button
            onClick={() => setShowPreview(true)}
            className="page-btn"
            type="button"
          >
            이미지로 저장하기
          </button>
          <button
            onClick={handleDeleteButton}
            className="bg-rose-400 page-btn"
            type="button"
          >
            삭제하기
          </button>
        </div>
      </form>
      {data && showPreview && (
        <Preview data={data} close={() => setShowPreview(false)} />
      )}
    </>
  );
};

export default DiaryDetail;
