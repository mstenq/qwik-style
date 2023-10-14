import { $, component$, useSignal } from "@builder.io/qwik";
import { CalendarProps } from "./Calendar.types";
import {
  addMonths,
  createCalendarGrid,
  getFirstDayOfMonth,
  getLastDayOfMonth,
  subtractDays,
  subtractMonths,
} from "@/utils";

export const Calendar = component$((props: CalendarProps) => {
  const firstDayOfMonth = useSignal(getFirstDayOfMonth(props.startDate));
  const { grid, labels, month, year } = createCalendarGrid(
    firstDayOfMonth.value,
    "sunday"
  );

  const prev = $(() => {
    firstDayOfMonth.value = subtractMonths(firstDayOfMonth.value, 1);
  });
  const next = $(() => {
    firstDayOfMonth.value = addMonths(firstDayOfMonth.value, 1);
  });

  return (
    <>
      <div class={["CalendarRoot"]}>
        <div class={["CalendarHeader"]}>
          <button onClick$={prev}>Prev</button>
          <div>
            {month} - {year}
          </div>
          <button onClick$={next}>Today</button>
          <button onClick$={next}>Next</button>
        </div>
        <div class={["CalendarGrid"]}>
          {labels.map((label, i) => (
            <div class={["CalendarGridHeader"]} key={i}>
              {label}
            </div>
          ))}
          {grid.map((week) =>
            week.map((item, j) => (
              <button
                data-today={item.isToday}
                data-month={item.isCurrentMonth ? "current" : "not-current"}
                class={["CalendarGridCell"]}
                key={j}
              >
                {item.date.getDate()}
              </button>
            ))
          )}
        </div>
      </div>
      <pre>
        {JSON.stringify(
          {
            startDate: props.startDate,
            grid,
          },
          null,
          2
        )}
      </pre>
    </>
  );
});
