export const getDayNameOfWeek = (
  date: Date,
  locale: Intl.LocalesArgument = "en-US",
  format: Intl.DateTimeFormatOptions["weekday"] = "short"
) => {
  return date.toLocaleDateString(locale, {
    weekday: format,
  });
};

export const getMonthName = (
  date: Date,
  locale: Intl.LocalesArgument = "en-US",
  format: Intl.DateTimeFormatOptions["month"] = "long"
) => {
  return date.toLocaleDateString(locale, {
    month: format,
  });
};
