import "../styles/customCalendar.css";

import Calendar from "react-calendar";
import { SelectedDate } from "./Header";

interface ICustomCalendar {
  date: SelectedDate;
  onChange: (v: SelectedDate) => void;
}

const CustomCalendar = ({ date, onChange }: ICustomCalendar) => {
  return (
    <div className="w-[300px] absolute right-0 top-20 ">
      <Calendar value={date} onChange={(v) => onChange(v)} />
    </div>
  );
};

export default CustomCalendar;
