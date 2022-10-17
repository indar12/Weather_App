import { data } from './index.js';
/**
 *
 * updates the live time and date of current selected city
 * @param {string} selectedCityName
 * @return {number} 
 */
/**
 *
 * changes the next five hours with respect to current hour of the current city
 * @param {number} hour
 * @param {number} minute
 * @param {number} second
 * @param {string} period
 */
 function updateFutureDateTime(hour, minute, second, period) {
  let hrs = parseInt(hour);
  let min = parseInt(minute);
  let sec = parseInt(second);
  let am_pm = period;
  /** @type {string} */
  let str;
  let nowTime = document.getElementsByClassName("hrs");
  nowTime[0].innerHTML = "NOW";
  for (let i = 1; i < nowTime.length; i++) {
    hrs = hrs <= 11 ? hrs + 1 : hrs > 12 ? hrs - 12 : 1;
    am_pm =
      hrs == 12 ? (am_pm == "am" ? (am_pm = "pm") : (am_pm = "am")) : am_pm;
    str = am_pm == "am" ? hrs + "AM" : hrs + "PM";
    nowTime[i].innerHTML = str;
  }
}
function updateUIToCity(UIElementID, UIAttribute, valueToUpdate) {
  UIAttribute == "src"
    ? (document.getElementById(UIElementID).src = valueToUpdate)
    : (document.getElementById(UIElementID).innerHTML = valueToUpdate);
}
var completeDate;
function addZero(str) {
  return (str = "0" + str);
}
function updateSelectedCityTime(selectedCityName) {
    /** @type {number} */
    let timeout;
    /**
     * displays the live time
     *
     */
    function displayTime() {
      let date = new Date().toLocaleString("en-US", {
        timeZone: data[selectedCityName].timeZone,
      });
      /** @type {string} */
      let period;
      /**
       * update the live date for the current city
       *
       */
      function updateDate() {
        let day = new Date(date).getDate();
        let month = new Date(date).toLocaleString("en-US", { month: "short" });
        let year = new Date(date).getFullYear();
        day < 10 ? day = addZero(day) : day = day;
        completeDate = day + "-" + month + "-" + year;
        updateUIToCity('date','innerHTML',completeDate);      
      }
      /**
       * update the live time for the current city
       *
       */
      function updateTime() {
        let hour = new Date(date).getHours();
        let min = new Date(date).getMinutes();
        let sec = new Date(date).getSeconds();
        /**
         * upate the live hour for the current city
         *
         */
        function updateHour()
        {
          hour == 0
          ? ((hour = 12), (period = "am"))
          : hour < 12
          ? (period = "am")
          : hour == 12
          ? (period = "pm")
          : hour > 12
          ? ((hour -= 12), (period = "pm"))
          : (period = "am");
        hour < 10 ? (hour = addZero(hour)) : (hour = hour),
          min < 10 ? (min = addZero(min)) : (min = min),
          sec < 10 ? (sec = addZero(sec)) : (sec = sec);
        }
        updateHour();
        let completeHrsMin =  hour + ":" + min + ":";
        let completeSec = sec + " ";
        let amPmImg = `./Assets/OneDrive_4_7-24-2022/${period}State.svg`;
        updateUIToCity('hrs-min','innerHTML',completeHrsMin);
        updateUIToCity('second','innerHTML',completeSec);
        updateUIToCity('am-img','src',amPmImg);
        updateFutureDateTime(hour, min, sec, period);
      }
      updateDate();
      updateTime();
    }
    clearInterval(timeout);
    return timeout = setInterval(displayTime, 1000);
  }

export{updateSelectedCityTime,completeDate};