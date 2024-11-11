import { Diary } from "@/api/types";
import { format } from "date-fns";

const Preview = ({ data }: { data: Diary }) => {
  const handleSave = () => {};

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-gray-800/40 flex flex-col gap-4 items-center justify-center">
      <div className="w-[600px] h-[550px] bg-[var(--main-white)] p-8 rounded-md flex flex-col gap-4">
        <div className="flex flex-col">
          <span className="text-gray-500">
            {format(new Date(data.date), "yyyy년 M월 d일")}
          </span>
          <h1 className="text-2xl">{data.title}</h1>
        </div>
        {data.picture ? (
          <img className="w-full aspect-[7/3] border-2" src={data.picture} />
        ) : (
          <div className="w-full aspect-[7/3] bg-gray-200 rounded-md flex items-center justify-center">
            그림이 없어요 :(
          </div>
        )}
        <span>{data.content}</span>
      </div>
      <button className="bg-gray-800 text-white p-2 rounded-md">
        이미지 저장
      </button>
    </div>
  );
};

export default Preview;
