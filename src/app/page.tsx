"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGoButton = () => {
    const date = format(new Date(), "yyyy-MM-dd");
    router.push(`/${date}`);
  };

  return (
    <div className="flex justify-center items-center h-screen  font-pretendard">
      <div className="flex flex-col w-80 h-80 justify-center items-center bg-gray-800 rounded-full">
        <h1 className="font-black text-white text-[3rem]">그림일기</h1>
        <h3 className="text-white">그림일기로 하루를 기록해보세요!</h3>
        <button
          onClick={handleGoButton}
          className="w-20 h-12 bg-white text-gray-800 rounded-md mt-8 text-lg font-black"
        >
          GO
        </button>
      </div>
    </div>
  );
}
