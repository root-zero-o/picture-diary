import Canvas from "@/components/Canvas";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex h-screen justify-center font-pretendard">
      <main
        className="w-full
       max-w-[800px] h-full flex flex-col items-center p-10 pb-16 gap-4"
      >
        <Header />
        <div className="w-full h-full flex flex-col gap-4 border-gray-300 border-[1px] rounded-md shadow-lg p-6">
          <div className="w-full flex">
            <input
              className="h-10 p-2 border-b-2 text-2xl"
              placeholder="제목"
              spellCheck="false"
            />
          </div>
          <Canvas />
          <textarea
            placeholder="내용을 입력하세요"
            spellCheck="false"
            className="h-full"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-800 text-[var(--main-white)] w-fit p-2 rounded-md">
            저장하기
          </button>
          <button className="bg-rose-400 text-[var(--main-white)] w-fit p-2 rounded-md">
            삭제하기
          </button>
        </div>
      </main>
    </div>
  );
}
