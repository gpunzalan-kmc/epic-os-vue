import { format, subMinutes } from "date-fns";
function date(
  date: string | number,
  dateFormat = "MMMM dd, yyyy" as string
): string {
  return format(new Date(date), dateFormat);
}

function now(): string {
  return format(new Date(), "MMMM dd, yyyy");
}

function dateRange(span: number): Array<string> {
  return [
    format(subMinutes(new Date(), span), "yyyy-MM-dd HH:mm:ss"),
    format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  ];
}

function getNumberOfDays(start: string, end = new Date().toDateString()) {
  const date1 = new Date(start);
  const date2 = new Date(end);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays;
}

export { date, now, dateRange, getNumberOfDays };
