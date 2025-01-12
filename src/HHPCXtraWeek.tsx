// Define the months and their number of days
const getMonths = (year) => {
  const months = [
    { name: 'January', numDays: 30, startDay: 0 },
    { name: 'February', numDays: 30, startDay: 2 },
    { name: 'March', numDays: 31,startDay: 4  },
    { name: 'April', numDays: 30, startDay: 0 },
    { name: 'May', numDays: 30, startDay: 2 },
    { name: 'June', numDays: 31, startDay: 4 },
    { name: 'July', numDays: 30, startDay: 0 },
    { name: 'August', numDays: 30, startDay: 2 },
    { name: 'September', numDays: 31, startDay: 4 },
    { name: 'October', numDays: 30, startDay: 0 },
    { name: 'November', numDays: 30, startDay: 2 },
    { name: 'December', numDays: 31, startDay: 4 }
  ];

  if (isExtraWeekYear(year)) {
    months.push({ name: 'Xtra', numDays: 7 }); // Add extra week
  }

  return months;
};

// Check if the given year is an extra week year
const isExtraWeekYear = (year) => {
  const extraWeekYears = [2020, 2026, 2032, 2037, 2043, 2048];
  return extraWeekYears.includes(year);
};

// Get the total number of months for a given year
const getNumberOfMonths = (year) => {
  const months = getMonths(year);
  return months.length;
};

export { getMonths, isExtraWeekYear, getNumberOfMonths };
