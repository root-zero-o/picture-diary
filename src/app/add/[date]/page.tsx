"use client";

import { useParams, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

import { useCreateDiary } from "@/api/hooks";
import Canvas from "@/components/Canvas";

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
    <form
      className="w-full h-full flex flex-col items-center gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-full flex flex-col gap-4 border-gray-300 border-[1px] rounded-md shadow-lg p-6">
        <div className="w-full flex">
          <input
            className="h-10 p-2 border-b-2 text-2xl"
            placeholder="제목"
            spellCheck="false"
            {...register("title", { required: true })}
          />
        </div>
        <Canvas updateMode />
        <textarea
          placeholder="내용을 입력하세요"
          spellCheck="false"
          className="h-full"
          {...register("content", { required: true })}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!isValid || isPending}
          className="bg-gray-800 disabled:bg-gray-400 text-[var(--main-white)] w-fit p-2 rounded-md "
        >
          저장하기
        </button>
        <button
          type="button"
          onClick={handleBackButton}
          className="bg-gray-600 disabled:bg-gray-400 text-[var(--main-white)] w-fit p-2 rounded-md "
        >
          취소
        </button>
      </div>
    </form>
  );
};

export default Add;
