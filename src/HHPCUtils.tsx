// HHPCUtils.ts
const createMonth = (name: string, numDays: number, index: number) => ({
  name,
  numDays,
  index,
});

const createDay = (name: string, index: number) => ({
  name,
  index,
});

export const setUpHHPC = () => {
  const months = [
    createMonth("January", 30, 0),
    createMonth("February", 30, 1),
    createMonth("March", 31, 2),
    createMonth("April", 30, 3),
    createMonth("May", 30, 4),
    createMonth("June", 31, 5),
    createMonth("July", 30, 6),
    createMonth("August", 30, 7),
    createMonth("September", 31, 8),
    createMonth("October", 30, 9),
    createMonth("November", 30, 10),
    createMonth("December", 31, 11),
    createMonth("Xtra", 7, 12),
  ];

  const daysOfTheWeek = [
    createDay("Monday", 0),
    createDay("Tuesday", 1),
    createDay("Wednesday", 2),
    createDay("Thursday", 3),
    createDay("Friday", 4),
    createDay("Saturday", 5),
    createDay("Sunday", 6),
  ];

  const extraYears = [
    1970, 1976, 1981, 1987, 1992, 1998, 2004, 2009, 2015, 2020, 2026, 2032,
    2037, 2043, 2048, 2054, 2060, 2065, 2071, 2076, 2082, 2088, 2093, 2099,
    2105, 2111, 2116, 2122, 2128, 2133, 2139, 2144, 2150, 2156, 2161, 2167,
    2172, 2178, 2184, 2189, 2195,
  ];

  const hhpc = {
    months,
    daysOfTheWeek,
    todaysMonth: months[11], // Start with December
    todaysDay: 1,
    todaysDayOfTheWeek: daysOfTheWeek[4], // Start with Friday
    todaysYear: 2016,

    goForward: function () {
      this.todaysDay++;
      this.todaysDayOfTheWeek = daysOfTheWeek[(this.todaysDayOfTheWeek.index + 1) % 7];
      if (this.todaysDay > this.todaysMonth.numDays) {
        this.todaysDay = 1;
        const newMonthIndex = extraYears.includes(this.todaysYear)
          ? (this.todaysMonth.index + 1) % 13
          : (this.todaysMonth.index + 1) % 12;
        this.todaysMonth = this.months[newMonthIndex];
      }
      if (this.todaysMonth === months[0] && this.todaysDay === 1) {
        this.todaysYear++;
      }
    },

    toString: function () {
      return `${this.todaysYear}, ${this.todaysMonth.name} ${this.todaysDay}, ${this.todaysDayOfTheWeek.name}`;
    },
  };


  const startGregorianYear = 2016;
  const startGregorianMonth = 11; // December (0-indexed)
  const startGregorianDay = 2;

  const nowUTC = new Date();
  const dStartUTC = new Date(Date.UTC(startGregorianYear, startGregorianMonth, startGregorianDay));
  const dEndUTC = new Date(Date.UTC(nowUTC.getUTCFullYear(), nowUTC.getUTCMonth(), nowUTC.getUTCDate()));

  const diffDays = Math.round((dEndUTC.getTime() - dStartUTC.getTime()) / (1000 * 60 * 60 * 24));

  for (let i = 0; i < diffDays; i++) {
    hhpc.goForward();
  }

  console.log (hhpc.toString());

  return hhpc.toString();
};

export {setUpHHPC};