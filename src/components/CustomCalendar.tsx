import "../styles/customCalendar.css";

import Calendar, { OnArgs } from "react-calendar";

import { useDiaryCount } from "@/api/hooks";
import { format } from "date-fns";
import { useState } from "react";
import { SelectedDate } from "./Header";

interface ICustomCalendar {
  date: SelectedDate;
  onChange: (v: SelectedDate) => void;
}

const CustomCalendar = ({ date, onChange }: ICustomCalendar) => {
  const [calendarDate, setCalendarDate] = useState(date);
  const month = format(calendarDate as Date, "yyyy-MM");

  const { data, isFetching } = useDiaryCount(month);

  const handleChangeMonth = ({ activeStartDate }: OnArgs) => {
    if (!activeStartDate) return;
    setCalendarDate(activeStartDate);
  };

  const handleChangeDate = (v: SelectedDate) => {
    setCalendarDate(v);
    onChange(v);
  };

  return (
    <div className="w-[300px] absolute right-0 top-20 ">
      <Calendar
        value={calendarDate}
        onChange={handleChangeDate}
        onActiveStartDateChange={handleChangeMonth}
        tileContent={({ date, view }) => {
          if (data?.find((x) => x.date === format(date, "yyyy-MM-dd"))) {
            return (
              <>
                <div className="flex justify-center items-center relative">
                  <div className="w-2 h-2 rounded-full bg-red-400 absolute top-[1px]" />
                </div>
              </>
            );
          }
        }}
      />
    </div>
  );
};

export default CustomCalendar;
