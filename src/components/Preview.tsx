import { Diary } from "@/api/types";
import { format } from "date-fns";
import html2canvas from "html2canvas";

const Preview = ({ data, close }: { data: Diary; close: () => void }) => {
  const handleSave = () => {
    const element = document.getElementById("img-el");
    if (!element) return;

    html2canvas(element).then((canvas) => {
      let link = document.createElement("a");
      document.body.appendChild(link);
      const temp = canvas.toDataURL("image/jpg");

      link.href = temp;
      link.download = `diary-${data.date}`;
      link.click();

      document.body.removeChild(link);
    });
  };

  return (
    <div className="w-full h-full fixed top-0 left-0 bg-gray-800/40 flex flex-col gap-4 items-center justify-center">
      <div
        id="img-el"
        className="w-[600px] h-[550px] bg-[var(--main-white)] p-8 rounded-md flex flex-col gap-4"
      >
        <div className="flex flex-col">
          <span className="text-gray-500">
            {format(new Date(data.date), "yyyy년 M월 d일")}
          </span>
          <h1 className="text-2xl">{data.title}</h1>
        </div>
        {data.picture ? (
          <img
            className="w-full aspect-[7/3] border-2 border-gray-200"
            src={data.picture}
          />
        ) : (
          <div className="w-full aspect-[7/3] bg-gray-200 rounded-md flex items-center justify-center">
            그림이 없어요 :(
          </div>
        )}
        <span>{data.content}</span>
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          이미지 저장
        </button>
        <button
          onClick={close}
          className="bg-gray-600 text-white p-2 rounded-md"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default Preview;
