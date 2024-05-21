"use client";

// Importing necessary CSS files
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import { DateRange } from "react-date-range"; // Importing DateRange component
import { useState } from "react"; // Importing useState hook
import { eachDayOfInterval } from "date-fns"; // Importing eachDayOfInterval function from date-fns library

/**
 * Component for selecting dates using a calendar.
 * @param {Object} reservation - Reservation details containing start and end dates.
 */
export function SelectCalendar({
  reservation,
}: {
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
}) {
  // State for managing selected date range
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  // Array to store disabled dates
  let disabledDates: Date[] = [];

  // Loop through each reservation item to get the date range
  reservation?.forEach((reservationItem) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservationItem.startDate),
      end: new Date(reservationItem.endDate),
    });

    // Concatenate disabled dates to the array
    disabledDates = [...disabledDates, ...dateRange];
  });

  // Return JSX
  return (
    <>
      {/* Hidden input fields to store selected start and end dates */}
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      {/* DateRange component for selecting date range */}
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
    </>
  );
}
