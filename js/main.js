function getMoonAge(year, month, day) {
  d = Math.floor(year/20);
  r = year-(d*20); // r is the remainder of (year/20)
  while (r>9) {
    r = r-19;
  }
  r = r*11;
  while (r>29) {
    r = r-30;
  }
  if (month<3) {
    month = month+2;
  }
  r = r+month+day;
  if (year<100) {
    r = r-4;
  } else {
    r = r-8.3;
  }
  while (r>29) {
    r = r-30;
  }
  while (r<0) {
    r = r+30;
  }
  return r;
}

function getNextFullThurs(moonAge) {
  currMilSecs = (new Date()).getTime();
  daysToGo = 15 - moonAge;
  while (daysToGo<2) {
    daysToGo = daysToGo+29;
  }
  milSecsToGo = daysToGo*24*60*60*1000;
  nextMoonTime = currMilSecs+milSecsToGo;
  nextMoonDate = new Date(nextMoonTime);
  while (nextMoonDate.getDay() != 4) {
    nextMoonDate = new Date(nextMoonDate.getFullYear(),nextMoonDate.getMonth(),nextMoonDate.getDate()+1);
  }

  return nextMoonDate;
}

document.addEventListener('DOMContentLoaded', function() {
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var date = new Date();
  var datebox = document.getElementById('date');
  var nextdate = getNextFullThurs(getMoonAge(date.getFullYear(), date.getMonth(), date.getDay()));
  datebox.innerHTML += nextdate.toLocaleDateString("en-GB", options);
});
