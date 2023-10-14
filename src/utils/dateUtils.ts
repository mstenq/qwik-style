import { getDayNameOfWeek, getMonthName } from "./dateFormat";

const DAY_IN_MS = 86400000;

export const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const getLastDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const subtractDays = (date: Date, days: number) => {
  const newDate = new Date(date.getTime());
  newDate.setDate(newDate.getDate() - days);
  return newDate;
};

export const addMonths = (date: Date, months: number) => {
  const newDate = new Date(date.getTime());
  newDate.setMonth(newDate.getMonth() + months);
  return newDate;
};

export const subtractMonths = (date: Date, months: number) => {
  const newDate = new Date(date.getTime());
  newDate.setMonth(newDate.getMonth() - months);
  return newDate;
};

export const isSameMonth = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth()
  );
};

export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

type DayOfWeek = "monday" | "sunday";
type GridItem = {
  date: Date;
  isToday: boolean;
  isCurrentMonth: boolean;
};

export const createCalendarGrid = (
  startDate: Date,
  firstDayOfWeek: DayOfWeek = "sunday"
): {
  grid: GridItem[][];
  labels: string[];
  month: string;
  year: number;
} => {
  const firstDayOfMonth = getFirstDayOfMonth(startDate);
  let date = subtractDays(firstDayOfMonth, firstDayOfMonth.getDay());
  if (firstDayOfWeek === "monday") {
    date = addDays(date, 1);
  }

  const grid = [];
  let row = [];
  for (let i = 0; i <= 42; i++) {
    if (i % 7 === 0 && i !== 0) {
      grid.push(row);
      row = [];
    }
    row.push({
      date,
      isCurrentMonth: isSameMonth(date, startDate),
      isToday: isSameDate(date, new Date()),
    });
    date = new Date(date.getTime() + DAY_IN_MS);
  }

  // create labels for the first row
  const labels = grid[0].map(({ date }) => getDayNameOfWeek(date));

  const month = getMonthName(startDate);
  const year = startDate.getFullYear();

  return { grid, labels, month, year };
};
