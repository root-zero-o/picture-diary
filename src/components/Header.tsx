"use client";

import { useParams, useRouter } from "next/navigation";

import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";

const CustomCalendar = dynamic(() => import("./CustomCalendar"), {
  ssr: false,
});

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const Header = () => {
  const router = useRouter();
  const params = useParams<{ date: string }>();

  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState<SelectedDate>(new Date(params.date));

  const handleChange = (v: SelectedDate) => {
    setDate(v);
    setShowCalendar(false);
    const date = format(v as Date, "yyyy-MM-dd");
    router.push(`/${date}`);
  };

  return (
    <div className="w-full flex justify-between items-end relative">
      <div className="flex flex-col gap-1 w-full">
        <h1 className="font-black text-4xl">그림일기</h1>
        <h4>오늘 하루를 그림으로 기록해보세요!</h4>
      </div>
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-12 h-fit py-2 flex justify-center bg-transparent hover:bg-gray-200"
      >
        <FaRegCalendarAlt />
      </button>
      {showCalendar && <CustomCalendar date={date} onChange={handleChange} />}
    </div>
  );
};

export default Header;
