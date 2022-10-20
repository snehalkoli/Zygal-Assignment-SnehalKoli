const ddlYears = document.getElementById("ddlYears");
const month = document.getElementById("month");
//Determine the Current Year.
var currentYear = new Date().getFullYear();
const calendar = document.getElementById("calendar");
const date = document.getElementById("date");

//Loop and add the Year values to DropDownList.
for (var i = 1950; i <= currentYear; i++) {
  var option = document.createElement("OPTION");
  option.innerHTML = i;
  option.value = i;
  ddlYears.appendChild(option);
}

function createCalendar(elem, year, month, selectedDate) {
  let mon = month - 1; // months in JS are 0..11, not 1..12
  let d = new Date(year, mon);

  let table =
    "<table><tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr><tr>";

  // spaces for the first row
  // from Monday till the first day of the month
  // * * * 1  2  3  4
  for (let i = 0; i < getDay(d); i++) {
    table += "<td></td>";
  }

  // <td> with actual dates
  while (d.getMonth() == mon) {
    if(d.getDate() == selectedDate) {
        console.log(selectedDate);
        table += "<td bgcolor='green'>" + d.getDate()+ "</td>"
    } else 
    table += "<td bgcolor='white'>" + d.getDate() + "</td>";

    if (getDay(d) % 7 == 6) {
      // sunday, last day of week - newline
      table += "</tr><tr>";
    }

    d.setDate(d.getDate() + 1);
  }

  // add spaces after last days of month for the last row
  // 29 30 31 * * * *
  if (getDay(d) != 0) {
    for (let i = getDay(d); i < 7; i++) {
      table += "<td></td>";
    }
  }

  // close the table
  table += "</tr></table>";

  elem.innerHTML = table;
}

function getDay(date) {
  // get day number from 0 (monday) to 6 (sunday)
  let day = date.getDay();
  if (day == 0) day = 7; // make Sunday (0) the last day
  return day - 1;
}

ddlYears.value = 2022;
createCalendar(calendar, ddlYears.value, month.value);

ddlYears.onchange = function () {
  createCalendar(calendar, ddlYears.value, month.value);
};

month.onchange = function () {
  createCalendar(calendar, ddlYears.value, month.value);
};

function displayDate() {
    createCalendar(calendar, ddlYears.value, month.value, Number(date.value));
}
