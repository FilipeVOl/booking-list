import React from "react";

interface EventDateProps {
  month: string;
  day: string | number;
  label?: string;
}

const getMonth = (month: string) => {
  switch (month) {
      case "01":
          return "Jan"
      case "02":
          return "Feb"
      case "03":
          return "Mar"
      case "04":
          return "Apr"
      case "05":
          return "May"
      case "06":
          return "Jun"
      case "07":
          return "Jul"
      case "08":
          return "Aug"
      case "09":
          return "Sep"
      case "10":
          return "Oct"
      case "11":
          return "Nov"
      case "12":
          return "Dec"
      default:
          return "Jan"
  }
}

const formatDateRange = (start: Date, end: Date) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startMonth = months[start.getMonth()];
  const endMonth = months[end.getMonth()];
  const startDay = start.getDate();
  const endDay = end.getDate();
  const year = end.getFullYear();
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
}

const EventDate: React.FC<EventDateProps> = ({ month, day, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-blue-100 rounded-t-lg px-4 pt-2 pb-1 w-16 flex flex-col items-center shadow">
        <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">{month}</span>
      </div>
      <div className="bg-white rounded-b-lg px-4 pb-2 w-16 flex flex-col items-center shadow border-t-0 border border-blue-100">
      <span className="text-2xl font-bold text-blue-400 leading-none">{day}</span>
        
      </div>
      <span className="text-sm font-bold text-gray-500 mt-1">{label}</span>
    </div>
  );
};

export { EventDate, getMonth, formatDateRange }; 