// For toggle button
function toggleClass() {
  const body = document.querySelector("body");
  body.classList.toggle("light");
  body.style.transition = `0.5s linear`;
}

// Check leap year
isLeap = (year) => {
  return (
    (year % 4 === 0 && year % 100 === 0 && year % 400 !== 0) ||
    (year % 100 === 0 && year % 400 === 0)
  );
};

getFebDays = (year) => {
  return isLeap(year) ? 29 : 28;
};
let month_picker = document.getElementById("month-picker");
let calendar = document.querySelector(".calendar");

const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

month_picker.onclick = () => {
  monthList.classList.add("show");
};

let monthList = calendar.querySelector(".month-list");

monthName.forEach((e, idx) => {
  let month = document.createElement("div");
  month.innerHTML = `<div>${e}</div>`;
  month.onclick = () => {
    monthList.classList.remove("show");
    currMonth.value = idx;
    generateCal(currMonth.value, currYear.value);
  };
  monthList.appendChild(month);
});

prevYear = document.querySelector("#prev-year");
prevYear.onclick = () => {
  currYear.value--;
  generateCal(currMonth.value, currYear.value);
};
nextYear = document.querySelector("#next-year");
nextYear.onclick = () => {
  currYear.value++;
  generateCal(currMonth.value, currYear.value);
};

generateCal = (month, year) => {
  let calendar_days = document.querySelector(".day");
  calendar_days.innerHTML = "";
  let header_year = document.querySelector("#year");
  let monthDays = [
    31,
    getFebDays(year),
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];

  let currDate = new Date();
  month_picker.innerHTML = monthName[month];
  header_year.innerHTML = year;

  let first_day = new Date(month, year, 1);

  for (let i = 0; i <= monthDays[month] + first_day.getDay() - 1; i++) {
    let day = document.createElement("div");
    if (i >= first_day.getDay()) {
      day.classList.add("calendar-day-hover");
      day.innerHTML = i - first_day.getDay() + 1;
      if (
        i - first_day.getDay() + 1 === currDate.getDate() &&
        year === currDate.getFullYear() &&
        month === currDate.getMonth()
      )
        day.classList.add("curr-date");
    }
    calendar_days.appendChild(day);
  }
};

let currDate = new Date();
let todayDate = { value: currDate.getDate() };
let currMonth = { value: currDate.getMonth() };
let currYear = { value: currDate.getFullYear() };
generateCal(currMonth.value, currYear.value);

let today = document.querySelector("#today");

today.innerHTML = `<h3>${todayDate.value} ${monthName[currMonth.value]} ${
  currYear.value
}</h3>`;
