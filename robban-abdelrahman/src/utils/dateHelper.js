export const isToday = (date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isThisWeek = (date) => {
  const now = new Date();

  const weekDay = (now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
  const monthDay = now.getDate();
  const mondayThisWeek = monthDay - weekDay;

  const startOfThisWeek = new Date(+now);
  startOfThisWeek.setDate(mondayThisWeek);
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfNextWeek = new Date(+startOfThisWeek);
  startOfNextWeek.setDate(mondayThisWeek + 7);

  return date >= startOfThisWeek && date < startOfNextWeek;
};

export const isThisMonth = (date) => {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
