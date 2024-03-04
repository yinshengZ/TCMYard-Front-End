export function getMonths(type) {
  let months_short = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let months_full = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "Octoboer",
    "November",
    "Decemeber",
  ];
  let months_numeric = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  switch (type) {
    case "short":
      return months_short;
    case "full":
      return months_full;
    case "num":
      return months_numeric;
  }
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
