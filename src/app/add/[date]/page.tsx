"use client";

import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCreateDiary } from "@/api/hooks";
import Canvas from "@/components/Canvas";
import { format } from "date-fns";

export interface IFormState {
  title: string;
  content: string;
}

const Add = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFormState>();
  const router = useRouter();
  const params = useParams<{ date: string }>();
  const { mutate, isPending } = useCreateDiary(params.date);

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const img = canvas.toDataURL();

    mutate({
      title: data.title,
      content: data.content,
      date: params.date,
      picture: img,
    });
  };

  const handleBackButton = () => {
    router.back();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="page-container">
        <span className="text-md text-gray-500">
          {format(new Date(params.date), "yyyy년 M월 d일")}
        </span>
        <div className="w-full flex">
          <input
            className="h-10 p-2 border-b-2 text-2xl"
            placeholder="제목"
            spellCheck="false"
            {...register("title", { required: true })}
          />
        </div>
        <Canvas updateMode picture={null} />
        <textarea
          placeholder="내용을 입력하세요"
          spellCheck="false"
          className="h-full min-h-40"
          {...register("content", { required: true })}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!isValid || isPending}
          className="page-btn"
        >
          저장하기
        </button>
        <button
          type="button"
          onClick={handleBackButton}
          className="page-btn bg-gray-600"
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default Add;
