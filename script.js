var countdownTimer; // Variable to store the countdown timer interval ID

function clock() {
  var today = new Date();

  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();
  let period = "AM";

  //time period selector(AM/PM)
  if (hours >= 12) {
    period = "PM";
    if (hours > 12) {
      hours -= 12;
    }
  }

  //adding the 0 to the time values lower than 10
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  document.querySelector(".hours").innerHTML = hours;
  document.querySelector(".minutes").innerHTML = minutes;
  document.querySelector(".seconds").innerHTML = seconds;
  document.querySelector(".period").innerHTML = period;
}

var updateClock = setInterval(clock, 1000);

//get proper date
var today = new Date();
const dayNumber = today.getDate();
const year = today.getFullYear();
const dayName = today.toLocaleString("default", { weekday: "long" });
const monthName = today.toLocaleString("default", { month: "short" });

document.querySelector(".month-name").innerHTML = monthName;
document.querySelector(".day-name").innerHTML = dayName;
document.querySelector(".day-number").innerHTML = dayNumber;
document.querySelector(".year").innerHTML = year;

function addTime() {
  var addHours = parseInt(document.getElementById("add-hours").value) || 0;
  var addMinutes = parseInt(document.getElementById("add-minutes").value) || 0;

  var currentHours = parseInt(document.querySelector(".hours").innerHTML);
  var currentMinutes = parseInt(document.querySelector(".minutes").innerHTML);
  var period = document.querySelector(".period").innerHTML;

  // Convert to 24-hour format if necessary
  if (period === "PM" && currentHours !== 12) {
    currentHours += 12;
  }
  if (period === "AM" && currentHours === 12) {
    currentHours = 0;
  }

  var newMinutes = currentMinutes + addMinutes;
  var newHours = currentHours + addHours + Math.floor(newMinutes / 60);
  newMinutes = newMinutes % 60;
  newHours = newHours % 24;

  // Convert back to 12-hour format and determine period
  var newPeriod = newHours >= 12 ? "PM" : "AM";
  if (newHours > 12) {
    newHours -= 12;
  } else if (newHours === 0) {
    newHours = 12;
  }

  // Format the hours and minutes
  newHours = newHours < 10 ? "0" + newHours : newHours;
  newMinutes = newMinutes < 10 ? "0" + newMinutes : newMinutes;

  document.querySelector(".hours").innerHTML = newHours;
  document.querySelector(".minutes").innerHTML = newMinutes;
  document.querySelector(".period").innerHTML = newPeriod;

  // Update the countdown timer
  updateCountdown(addHours, addMinutes);
}

function updateCountdown(hours, minutes) {
  if (countdownTimer) {
    clearInterval(countdownTimer); // Clear the previous countdown timer
  }

  var countdownSeconds = hours * 3600 + minutes * 60;
  countdownTimer = setInterval(function () {
    if (countdownSeconds <= 0) {
      clearInterval(countdownTimer);
      document.querySelector(".countdown-timer").innerHTML = "00:00:00";
      document.getElementById("toilet-break-not-allowed").style.display =
        "none";
      document.getElementById("toilet-break-allowed").style.display = "none";
      document.getElementById("finished-allowed").style.display = "none";
    } else {
      countdownSeconds--;
      var hours = Math.floor(countdownSeconds / 3600);
      var minutes = Math.floor((countdownSeconds % 3600) / 60);
      var seconds = countdownSeconds % 60;

      var formattedTime =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);

      document.querySelector(".countdown-timer").innerHTML = formattedTime;

      // Update alert messages based on remaining time
      if (countdownSeconds <= 1800) {
        // 30 minutes
        document.getElementById("toilet-break-not-allowed").style.display =
          "block";
        document.getElementById("toilet-break-allowed").style.display = "none";
        document.getElementById("finished-allowed").style.display = "block";
      } else {
        document.getElementById("toilet-break-not-allowed").style.display =
          "none";
        document.getElementById("toilet-break-allowed").style.display = "block";
        document.getElementById("finished-allowed").style.display = "none";
      }
    }
  }, 1000);
}

function resetCountdown() {
  if (countdownTimer) {
    clearInterval(countdownTimer); // Clear the countdown timer
  }
  document.querySelector(".countdown-timer").innerHTML = "00:00:00"; // Reset the countdown timer display
  document.getElementById("toilet-break-not-allowed").style.display = "none";
  document.getElementById("toilet-break-allowed").style.display = "none";
  document.getElementById("finished-allowed").style.display = "none";
}
