// importing a function from another js-file
import {
  fetchEntireCityData,
  fetchOnlyNextNHrs,
} from "./weatherdata.js";
import { updateSelectedCityTime } from "./utility.js";
let timeout,weatherSelected,selectedCityName,citySelected,selectedIcon,cityDataWithoutCityName,country,card;
var continents = [],continentsList = [],data = {};;
var leftContentElement,rightContentElement,sunnyData,snowData,windData;
let sunnyButtonIconElement,snowButtonIconElement,windButtonIconElement;
let addCardElement,removeCardElement,cityCount,displayCount,buttonClicked,continentArrow,temperatureArrow;
/**
 *
 * set and get functions  to get the city details
 * @class selectedCityData
 */
class selectedCityData {
  constructor() {
    this.setCityName = function (cityName) {
      this.cityName = cityName;
    };
    this.setDateAndTime = function (dateAndTime) {
      this.dateAndTime = dateAndTime;
    };
    this.setTimeZone = function (timeZone) {
      this.timeZone = timeZone;
    };
    this.setTemperature = function (temperature) {
      this.temperature = temperature;
    };
    this.setHumidity = function (humidity) {
      this.humidity = humidity;
    };
    this.setPrecipitation = function (precipitation) {
      this.precipitation = precipitation;
    };
    this.setNextFiveHrs = function (nextFiveHrs) {
      this.nextFiveHrs = nextFiveHrs;
    };

    this.getCityName = function () {
      return this.cityName;
    };
    this.getDateAndTime = function () {
      return this.dateAndTime;
    };
    this.getTimeZone = function () {
      return this.timeZone;
    };
    this.getTemperature = function () {
      return this.temperature;
    };
    this.getHumidity = function () {
      return this.humidity;
    };
    this.getPrecipitation = function () {
      return this.precipitation;
    };
    this.getNextFiveHrs = function () {
      return this.nextFiveHrs;
    };
  }
  updateUIToCity(UIElementID, UIAttribute, valueToUpdate) {
    UIAttribute == "src"
      ? (document.getElementById(UIElementID).src = valueToUpdate)
      : (document.getElementById(UIElementID).innerHTML = valueToUpdate);
  }
  /**
   *
   *changes the temperature and humidity according to selected city
   * @param {string} selectedCityName - contains city
   */
  updateTemperatureHumidity(selectedCityName) {
    //setting the temperature of selected city using object
    dataOfSelectedCity.setTemperature(data[selectedCityName].temperature);
    //getting the temperature of selected city using object
    let temperature = parseInt(dataOfSelectedCity.getTemperature()) + " C";
    dataOfSelectedCity.updateUIToCity("temp-deg", "innerHTML", temperature);
    dataOfSelectedCity.setHumidity(data[selectedCityName].humidity);
    let humidity = dataOfSelectedCity.getHumidity();
    dataOfSelectedCity.updateUIToCity("humi-deg", "innerHTML", humidity);
    //getting the temperature of selected city using object
    let fahrenheit =
      parseInt((parseInt(dataOfSelectedCity.getTemperature()) * 9) / 5 + 32) +
      " F";
    dataOfSelectedCity.updateUIToCity("fahren", "innerHTML", fahrenheit);
    //setting the precipitation of selected city using object
    dataOfSelectedCity.setPrecipitation(data[selectedCityName].precipitation);
    //getting the precipitation of selected city using object
    let precipitation = dataOfSelectedCity.getPrecipitation();
    dataOfSelectedCity.updateUIToCity(
      "precipitation",
      "innerHTML",
      precipitation
    );
  }
  /**
   *changes the city icon with respect to selected city
   *
   */
  updateCityIcon() {
    let img = document.getElementById("city").value.toLowerCase();
    document.getElementById(
      "cloud-img"
    ).src = `./Assets/OneDrive_3_7-24-2022/${img}.svg`;
  }
  /**
   *
   * changes the climate icon for the next five hours
   * @param {string} selectedCityName
   */
  async updateFutureIcon(selectedCityName) {
    console.log("hi");
    /** @type {object}- contains next five hours temperature*/
    let nextFiveHrs = await fetchOnlyNextNHrs();
    console.log(nextFiveHrs);
    for (let i = 0; i < nextFiveHrs.length; i++) {
      nextFiveHrs[i] = parseInt(nextFiveHrs[i]);
    }
    /** @type {number} - contains current temperature*/
    let nowTemp = parseInt(data[selectedCityName].temperature);
    nextFiveHrs.unshift(nowTemp);
    let collections = document.getElementsByClassName("para");
    for (let i = 0; i < collections.length; i++) {
      collections[i].innerHTML = nextFiveHrs[i];
    }
    (() => {
      let imgCollections = document.getElementsByClassName("img-cloud");
      for (let i = 0; i < imgCollections.length; i++) {
        if (nextFiveHrs[i] < 18) {
          imgCollections[i].src = "./Assets/OneDrive_1_7-24-2022/rainyIcon.svg";
        } else if (nextFiveHrs[i] >= 18 && nextFiveHrs[i] <= 22) {
          imgCollections[i].src = "./Assets/OneDrive_1_7-24-2022/windyIcon.svg";
        } else if (nextFiveHrs[i] >= 23 && nextFiveHrs[i] <= 29) {
          imgCollections[i].src =
            "./Assets/OneDrive_1_7-24-2022/cloudyIcon.svg";
        } else if (nextFiveHrs[i] > 29) {
          imgCollections[i].src = "./Assets/OneDrive_1_7-24-2022/sunnyIcon.svg";
        }
      }
    })();
  }
  /**
   * for invalid or handleNil city it update the city next five hours
   *
   */
  updateNilUIToFutureHrs() {
    let collections = document.getElementsByClassName("para");
    for (let i = 0; i < collections.length; i++) {
      collections[i].innerHTML = "NIL";
    }
    let imgCollections = document.getElementsByClassName("img-cloud");
    for (let i = 0; i < imgCollections.length; i++) {
      imgCollections[i].src = "./Assets/OneDrive_4_7-24-2022/warning.svg";
    }
    let nowTime = document.getElementsByClassName("hrs");
    for (let i = 0; i < nowTime.length; i++) {
      nowTime[i].innerHTML = "NIL";
    }
  }
  /**
   *if no city selected or wrong input handleNil function will occurs
   *
   */
  handleNil() {
      dataOfSelectedCity.updateUIToCity(
        "cloud-img",
        "src",
        "./Assets/OneDrive_4_7-24-2022/warning.svg"
      );
    dataOfSelectedCity.updateUIToCity("date", "innerHTML", "NIL/NIL/NIL");
    dataOfSelectedCity.updateUIToCity("hrs-min", "innerHTML", "NIL:NIL: ");
    dataOfSelectedCity.updateUIToCity(
      "am-img",
      "src",
      "./Assets/OneDrive_4_7-24-2022/warning.svg"
    );
    dataOfSelectedCity.updateUIToCity("second", "innerHTML", "NIL");
    dataOfSelectedCity.updateUIToCity("temp-deg", "innerHTML", "NIL C");
    dataOfSelectedCity.updateUIToCity("humi-deg", "innerHTML", "NIL %");
    dataOfSelectedCity.updateUIToCity("fahren", "innerHTML", "NIL F");
    dataOfSelectedCity.updateUIToCity("precipitation", "innerHTML", "NIL %");
    dataOfSelectedCity.updateNilUIToFutureHrs();
  }
  /**
   *
   * checks input has value or handleNil
   * if null or wrong input handleNil function should be called
   * if not updateSelectedCityTime functions called
   * @param {string} selectedCityName - contains city
   */
  checkCity(selectedCityName) {
    /** used to check input @type {number} */
    let flag = 0;
    for (let key in data) {
      if (selectedCityName == key) {
        flag = 1;
        break;
      } else {
        continue;
      }
    }
    flag === 1
      ? (clearInterval(timeout),
        (timeout = updateSelectedCityTime(selectedCityName)),
        dataOfSelectedCity.updateTemperatureHumidity(selectedCityName),
        dataOfSelectedCity.updateCityIcon(),
        dataOfSelectedCity.updateFutureIcon(selectedCityName))
      : (clearInterval(timeout), dataOfSelectedCity.handleNil());
  }
  /**
   *gets the currently selected city from the user
   *
   */
  choseCity() {
    //setting the selected city using object
    dataOfSelectedCity.setCityName(
      document.getElementById("city").value.toLowerCase()
    );
    //getting the selected city using object
    selectedCityName = dataOfSelectedCity.getCityName();
    dataOfSelectedCity.checkCity(selectedCityName);
  }
  /**
   *
   *to add zero atfirst
   * @param {string} str - contains time(hours,minute,seconds)
   * @return {string}
   */
  addZero(str) {
    return (str = "0" + str);
  }

}
var dataOfSelectedCity = new selectedCityData();
//gets all the keys from data and make an option tag for that element datalist
(async() =>{
  await defaultCityDisplay();
  async function defaultCityDisplay(){
    cityDataWithoutCityName = await fetchEntireCityData();
    const arrayToObj = (cityDataWithoutCityName) => {
      return cityDataWithoutCityName.reduce((obj, item) => {
        obj[item.cityName.toLowerCase()] = item;
        return obj;
      }, {});
    };
    data = arrayToObj(cityDataWithoutCityName);
    let element = document.getElementById("cities");
    for (let keys in data) {
      let option = document.createElement("option");
      dataOfSelectedCity.setCityName(data[keys].cityName);
      option.value = dataOfSelectedCity.getCityName();
      element.appendChild(option);
    }
    //calls the chose function once
    dataOfSelectedCity.choseCity();
    middle();
  }
  setInterval(defaultCityDisplay,3.6e+6);
})();
export { data };
/**
 * input box value is stored
 *  @type {object}
 */
citySelected = document.getElementById("city");
//event listener is added
citySelected.addEventListener("change", dataOfSelectedCity.choseCity);
//section - 2
/**
 *
 * inherited the parent class and add few more methods
 * @class selectedCityWeather
 * @extends {selectedCityData}
 */
class selectedCityWeather extends selectedCityData {
  constructor() {
    super();
  }
  /**
   * function that creates a card structure without any content
   *
   * @param {object} climateSet
   * @param {number} iterate
   */
  createCardTemplate(climateSet, iterate) {
    card = document.createElement("div");
    card.setAttribute("class", "card");
    

    weatherDataOfSelectedCity.setCityName(climateSet[iterate][0]);
    card.setAttribute(
      "style",
      `background-image: url('./Assets/OneDrive_3_7-24-2022/${weatherDataOfSelectedCity.getCityName()}.svg')`
    );
    addCardElement.appendChild(card);
  }
  /**
   * function that appends the left portion with the card
   *
   */
  updateCardsLeftContent() {
    leftContentElement = document.createElement("div");
    leftContentElement.setAttribute("class", "left-content");
    card.appendChild(leftContentElement);
  }
  /**
   * function that updates the cardsElement title as selected city name
   *
   * @param {object} climateSet
   * @param {number} iterate
   */
  updateCardsTitle(climateSet, iterate) {
    let cardCityParaElement = document.createElement("p");
    cardCityParaElement.setAttribute("class", "card-city-para");
    weatherDataOfSelectedCity.setCityName(climateSet[iterate][1].cityName);
    cardCityParaElement.append(weatherDataOfSelectedCity.getCityName());
    leftContentElement.appendChild(cardCityParaElement);
  }
  /**
   *
   * this function updates the live time in the card
   * @param {string} selectedCity the selected city is passed to get the live time of the city
   * @param {string} time time is the reference where the output is appended
   */
  displayTime(selectedCity, time) {
    let finalTime;
    let period;
    weatherDataOfSelectedCity.setTimeZone(data[selectedCity].timeZone);
    let date = new Date().toLocaleString("en-US", {
      timeZone: weatherDataOfSelectedCity.getTimeZone(),
    });
    let hour = new Date(date).getHours();
    let min = new Date(date).getMinutes();
    let sec = new Date(date).getSeconds();
    /**
     * this function updates the hour whether am or pm
     *
     */
    function updateHour() {
      hour == 0
        ? ((hour = 12), (period = "am"))
        : hour < 12
        ? (period = "am")
        : hour == 12
        ? (period = "pm")
        : hour > 12
        ? ((hour -= 12), (period = "pm"))
        : (period = "am");
      hour < 10 ? (hour = dataOfSelectedCity.addZero(hour)) : (hour = hour);
      min < 10 ? (min = dataOfSelectedCity.addZero(min)) : (min = min);
      sec < 10 ? (sec = dataOfSelectedCity.addZero(sec)) : (sec = sec);
    }
    updateHour();
    finalTime = hour + ":" + min + " " + period.toUpperCase();
    time.innerHTML = finalTime;
  }
  /**
   * function that updates the time of the selected cities in the card
   *
   * @param {object} climateSet
   * @param {number} iterate
   */
  // ---------------------------------------------------
  updateCardsTime(climateSet, iterate) {
    let cardCityTimeElement = document.createElement("p");
    weatherDataOfSelectedCity.setCityName(climateSet[iterate][0]);
   
    cardCityTimeElement.setAttribute("class", "card-city-time");
    leftContentElement.appendChild(cardCityTimeElement);
    setInterval(
      weatherDataOfSelectedCity.displayTime,
      1,
      weatherDataOfSelectedCity.getCityName(),
      cardCityTimeElement
    );
  }
  /**
   * function which concatenate the day month year and send the output to the called function
   *
   * @return {string}
   */
  formatCardDate() {
    return this.day + "-" + this.month + "-" + this.year;
  }
  /**
   *
   * this function updates the date of the card
   * @param {string} selectedCity the selected city is passed to get the live date of the selected city
   * @return {string} returns the date format of the selected city to the called function updateCardsDate
   */
  displayDate(selectedCity) {
    let finalDate;
    weatherDataOfSelectedCity.setTimeZone(data[selectedCity].timeZone);
    let date = new Date().toLocaleString("en-US", {
      timeZone: weatherDataOfSelectedCity.getTimeZone(),
    });
    let cityDate = {
      day: new Date(date).getDate(),
      month: new Date(date).toLocaleString("en-US", { month: "short" }),
      year: new Date(date).getFullYear(),
    };
    finalDate = weatherDataOfSelectedCity.formatCardDate.call(cityDate);
    return finalDate;
  }
  /**
   * function that updates the date of the selected cities in the card
   *
   * @param {object} climateSet
   * @param {number} iterate
   */
  updateCardsDate(climateSet, iterate) {
    let cardCityDateElement = document.createElement("p");
    cardCityDateElement.innerText = weatherDataOfSelectedCity.displayDate(
      weatherDataOfSelectedCity.getCityName()
    );
    cardCityDateElement.setAttribute("class", "card-city-date");
    leftContentElement.appendChild(cardCityDateElement);
  }
  /**
   * function that updates the humidity of the selected cities in the card
   *
   * @param {object} climateSet
   * @param {number} iterate
   */
  updateCardsHumidity(climateSet, iterate) {
    weatherDataOfSelectedCity.createAndUpdateWeatherForCard(
      "./Assets/OneDrive_1_7-24-2022/humidityIcon.svg",
      climateSet,
      iterate,
      "humidity",
      "card-city-humi"
    );
  }
  /**
   * function that updates the precipitation and precipitation image of the selected cities in the card
   *
   * @param {object} climateSet
   * @param {number} iterate
   */
  updateCardsPrecipitation(climateSet, iterate) {
    weatherDataOfSelectedCity.createAndUpdateWeatherForCard(
      "./Assets/OneDrive_1_7-24-2022/precipitationIcon.svg",
      climateSet,
      iterate,
      "precipitation",
      "card-city-precip"
    );
  }
  /**
   * function that updates image and temperature  of the selected cities in the card
   *
   * @param {object} climateSet
   * @param {number} iterate
   */
  updateCardsRightContent(climateSet, iterate) {
    rightContentElement = document.createElement("div");
    rightContentElement.setAttribute("class", "right-content");
    card.appendChild(rightContentElement);
    let cardImgElement = document.createElement("p");
    let img = document.createElement("img");
    img.src = `./Assets/OneDrive_1_7-24-2022/${selectedIcon}Icon.svg`;
    cardImgElement.appendChild(img);
    weatherDataOfSelectedCity.setTemperature(
      climateSet[iterate][1].temperature
    );
    cardImgElement.innerHTML += `&nbsp ${parseInt(
      weatherDataOfSelectedCity.getTemperature()
    )}&#8451`;
    rightContentElement.append(cardImgElement);
  }
  /**
   * function that make visible or invisible of the scroll arrow button based on the width of the card and widht of the container
   *
   */
  showOrHideCarousel() {
    let carouselElement = document.getElementsByClassName("arrow");
    let cardsElement = document.getElementById("card-container");
    for (let iterate = 0; iterate < carouselElement.length; iterate++) {
      cardsElement.scrollWidth > cardsElement.clientWidth
        ? (carouselElement[iterate].style.display = "block")
        : (carouselElement[iterate].style.display = "none");
    }
    return setTimeout(weatherDataOfSelectedCity.showOrHideCarousel);
  }
  /**
   *
   * this function calls the necessary functions to create a card
   * @param {object} climateSet
   * @param {number} iterate
   */
  createNewCard(climateSet, iterate) {
    weatherDataOfSelectedCity.createCardTemplate(climateSet, iterate);
    weatherDataOfSelectedCity.updateCardsLeftContent();
    weatherDataOfSelectedCity.updateCardsTitle(climateSet, iterate);
    weatherDataOfSelectedCity.updateCardsTime(climateSet, iterate);
    weatherDataOfSelectedCity.updateCardsDate(climateSet, iterate);
    weatherDataOfSelectedCity.updateCardsHumidity(climateSet, iterate);
    weatherDataOfSelectedCity.updateCardsPrecipitation(climateSet, iterate);
    weatherDataOfSelectedCity.updateCardsRightContent(climateSet, iterate);
    setTimeout(weatherDataOfSelectedCity.showOrHideCarousel, 1);
  }
  /**
   *
   * this function checks whether how many times card should be created
   * @param {number} [cityCount=3]
   * @param {number} [displayCount=3]
   * @param {string} [climateSet=sunnyData]
   */
  createAppropriateCards(
    cityCount = 3,
    displayCount = 4,
    climateSet = sunnyData
  ) {
    removeCardElement.replaceChildren();
    if (cityCount <= displayCount) {
      for (let i = 0; i < cityCount; i++) {
        weatherDataOfSelectedCity.createNewCard(climateSet, i);
      }
    } else if (displayCount <= cityCount) {
      for (let i = 0; i < displayCount; i++) {
        weatherDataOfSelectedCity.createNewCard(climateSet, i);
      }
    }
  }
  /**
   *
   * this function highlights the selected button when clicked and sets the minimum value to the spinner
   * this all depends on the button selected
   * @param {string} buttonid
   */
  updateButtonClicked(weatherSelected) {

    weatherDataOfSelectedCity.updateButtonIcon("sunny", "none");
    weatherDataOfSelectedCity.updateButtonIcon("snow", "none");
    weatherDataOfSelectedCity.updateButtonIcon("wind", "none");
    weatherSelected == "sunny-btn"
      ? (removeCardElement.replaceChildren(),
        (selectedIcon = "sunny"),
        (document.getElementById("spin").value =
          document.getElementById("spin").min),
        (cityCount = document.getElementById("spin").value),
        weatherDataOfSelectedCity.updateButtonIcon(
          "sunny",
          "2px solid skyblue"
        ),
        (displayCount = sunnyData.length),
      
        weatherDataOfSelectedCity.createAppropriateCards(
          cityCount,
          displayCount,
          sunnyData
        ))
      : weatherSelected == "snow-btn"
      ? (removeCardElement.replaceChildren(),
        (selectedIcon = "snowflake"),
        (document.getElementById("spin").value =
          document.getElementById("spin").min),
        (cityCount = document.getElementById("spin").value),
        weatherDataOfSelectedCity.updateButtonIcon("snow", "2px solid skyblue"),
        (displayCount = snowData.length),
        weatherDataOfSelectedCity.createAppropriateCards(
          cityCount,
          displayCount,
          snowData
        ))
      : weatherSelected == "wind-btn"
      ? (removeCardElement.replaceChildren(),
        (selectedIcon = "rainy"),
        (document.getElementById("spin").value =
          document.getElementById("spin").min),
        (cityCount = document.getElementById("spin").value),
        weatherDataOfSelectedCity.updateButtonIcon("wind", "2px solid skyblue"),
        (displayCount = windData.length),
        weatherDataOfSelectedCity.createAppropriateCards(
          cityCount,
          displayCount,
          windData
        ))
      : weatherDataOfSelectedCity.createAppropriateCards(
          cityCount,
          displayCount,
          windData
        );
  }
  //card section
  /**
   * this function checks the selected button with respect to the spinner value changes
   * update the select box value if the number of cities is less than maximum value
   */
  checkSelectedButtonWithSpinnerValue() {
    cityCount = document.getElementById("spin").value;
    selectedCityName;
    removeCardElement.replaceChildren();
    if (selectedIcon == "sunny") {
      displayCount = sunnyData.length;
      if (cityCount < 3) {
        cityCount = 3;
        document.getElementById("spin").value =
          document.getElementById("spin").min;
      } else if (cityCount > 10) {
        cityCount = 10;
        document.getElementById("spin").value =
          document.getElementById("spin").max;
      }
      weatherDataOfSelectedCity.createAppropriateCards(
        cityCount,
        displayCount,
        sunnyData
      );
    } else if (selectedIcon == "snowflake") {
      displayCount = snowData.length;
      if (cityCount < 3) {
        cityCount = 3;
        document.getElementById("spin").value =
          document.getElementById("spin").min;
      } else if (cityCount > 10) {
        cityCount = 10;
        document.getElementById("spin").value =
          document.getElementById("spin").max;
      }
      weatherDataOfSelectedCity.createAppropriateCards(
        cityCount,
        displayCount,
        snowData
      );
    } else {
      displayCount = windData.length;
      if (cityCount > 10) {
        cityCount = 10;
        document.getElementById("spin").value =
          document.getElementById("spin").max;
      } else if (cityCount < 3) {
        cityCount = 3;
        document.getElementById("spin").value =
          document.getElementById("spin").min;
      }
      weatherDataOfSelectedCity.createAppropriateCards(
        cityCount,
        displayCount,
        windData
      );
    }
  }
  createAndUpdateWeatherForCard(
    valueToUpdate,
    climateSet,
    iterate,
    weather,
    UIAttribute
  ) {
    let cardWeatherElement = document.createElement("p");
    let cardWeatherImgElement = document.createElement("img");
    cardWeatherImgElement.src = valueToUpdate;
    cardWeatherElement.append(cardWeatherImgElement);
    weatherDataOfSelectedCity.setCityName(climateSet[iterate][1][weather]);
    cardWeatherElement.innerHTML += `&nbsp${weatherDataOfSelectedCity.getCityName()}`;
    cardWeatherElement.setAttribute("class", UIAttribute);
    leftContentElement.appendChild(cardWeatherElement);
  }
  /**
   *
   * this function changes the border for the selected icon
   * @param {string} UIElementID
   * @param {string} valueToUpdate
   */
  updateButtonIcon(UIElementID, valueToUpdate) {
    valueToUpdate == "none"
      ? (document.getElementById(UIElementID).style.borderBottom =
          valueToUpdate)
      : (document.getElementById(UIElementID).style.borderBottom =
          valueToUpdate);
  }
  /**
   * function which checks whether forward button is clicked or backward button is clicked and change accordingly
   *
   */
  scrollArrowDirection() {
    if (buttonClicked == 1) {
      addCardElement.style = "scroll-behavior:smooth";
      addCardElement.scrollLeft -= 600;
      
    } else if (buttonClicked == 2) {
      addCardElement.style = "scroll-behavior:smooth";
      addCardElement.scrollLeft += 600;
      
    }
  }
  //section 3
  /**
   * for both temperature and continent it get the direction of arrow either up or down
   *
   * @param {string} type
   * @return {string}
   */
  fetchTempArrowOrContinentArrow(type) {
    if (type == "arrow-continent") {
      let currentContinentArrowDirection = continentArrow.src;
      currentContinentArrowDirection =
        currentContinentArrowDirection.split("/");
      let arrowToSortName = currentContinentArrowDirection[5].slice(0, -4);
      return arrowToSortName;
    } else if (type == "arrow-temperature") {
      let currentTemperatureArrowDirection = temperatureArrow.src;
      currentTemperatureArrowDirection =
        currentTemperatureArrowDirection.split("/");
      let arrowToSortTemp = currentTemperatureArrowDirection[5].slice(0, -4);
      return arrowToSortTemp;
    }
  }
  /**
   * add cards with given data and iterate for 12 times
   *
   */
  createCardWithGivenConditions() {
    for (let iterate = 0; iterate < 12; iterate++) {
      weatherDataOfSelectedCity.setTimeZone(continentsList[iterate][0]);
      weatherDataOfSelectedCity.setHumidity(
        data[continentsList[iterate][1].replace("_", "").toLowerCase()].humidity
      );
      weatherDataOfSelectedCity.setCityName(
        data[continentsList[iterate][1].replace("_", "").toLowerCase()].cityName
      );
      weatherDataOfSelectedCity.setTemperature(
        parseInt(
          data[continentsList[iterate][1].replace("_", "").toLowerCase()]
            .temperature
        )
      );
      weatherDataOfSelectedCity.addCards(
        weatherDataOfSelectedCity.getTimeZone(),
        weatherDataOfSelectedCity.getHumidity(),
        weatherDataOfSelectedCity.getCityName(),
        weatherDataOfSelectedCity.getTemperature()
      );
    }
  }
  /**
   *
   * if the arrow is up then arrange in descending if the arrow is down arrange the continents and temperature in either ascending order
   * @param {object} continentslist it has the continent name list
   * @param {string} order it has either ascending or descending string as value
   */
  sortInAscendingOrDescendingOrder(continentslist, order) {
    let arrowToSortTemp =
      weatherDataOfSelectedCity.fetchTempArrowOrContinentArrow(
        "arrow-temperature"
      );
    continentslist.sort(function (first, second) {
      if (order == "ascending") {
        if (first[0] < second[0]) return -1;
        if (first[0] > second[0]) return 1;
      } else if (order == "descending") {
        if (first[0] > second[0]) return -1;
        if (first[0] < second[0]) return 1;
      }
      weatherDataOfSelectedCity.setTemperature(
        parseInt(data[first[1].replace("_", "").toLowerCase()].temperature)
      );
      let previousCityTemperature = weatherDataOfSelectedCity.getTemperature();
      weatherDataOfSelectedCity.setTemperature(
        parseInt(data[second[1].replace("_", "").toLowerCase()].temperature)
      );
      let currentCityTemperature = weatherDataOfSelectedCity.getTemperature();
      if (arrowToSortTemp == "arrowUp") {
        if (previousCityTemperature < currentCityTemperature) return 1;
        if (previousCityTemperature > currentCityTemperature) return -1;
      }
      if (arrowToSortTemp == "arrowDown") {
        if (previousCityTemperature > currentCityTemperature) return 1;
        if (previousCityTemperature < currentCityTemperature) return -1;
      }
    });
  }
  /**
   * arrange the continents in either ascending or descending order
   *
   */
  sortContinentsBasedOnConditions() {
    let arrowToSortName =
      weatherDataOfSelectedCity.fetchTempArrowOrContinentArrow(
        "arrow-continent"
      );
    let citiesList = document.getElementById("country");
    citiesList.replaceChildren();
    if (arrowToSortName == "arrowDown") {
      weatherDataOfSelectedCity.sortInAscendingOrDescendingOrder(
        continentsList,
        "ascending"
      );
      weatherDataOfSelectedCity.createCardWithGivenConditions();
    }
    if (arrowToSortName == "arrowUp") {
      weatherDataOfSelectedCity.sortInAscendingOrDescendingOrder(
        continentsList,
        "descending"
      );
      weatherDataOfSelectedCity.createCardWithGivenConditions();
    }
  }
  /**
   *
   * fetches the live time of the countries
   * @param {string} name it stores the countries name
   * @param {object} countrytime it has the reference of time html tag
   */
  updateLiveTimeForEachCityList(name, countrytime) {
    weatherDataOfSelectedCity.setTimeZone(data[name].timeZone);
    let time = new Date().toLocaleString("en-US", {
      timeZone: weatherDataOfSelectedCity.getTimeZone(),
    });
    let hour = new Date(time).getHours();
    let min = new Date(time).getMinutes();
    let ampm = hour >= 12 ? "PM" : "AM";
    hour = hour % 12;
    hour = hour ? hour : 12;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    let countrylisttime = `${hour}:${min} ${ampm}`;
    let countrylivetime = `${name}, ${countrylisttime}`;
    countrylivetime =
      weatherDataOfSelectedCity.capitalizeFirstLetter(countrylivetime);
    countrytime.innerHTML = `${countrylivetime}`;
  }
  /**
   * create cards for the given country with given data
   *
   * @param {string} continentsName
   * @param {string} countryHumidity
   * @param {string} countryName
   * @param {string} countryTemperature
   */
  addCards(continentsName, countryHumidity, countryName, countryTemperature) {
    let bottomCardTemplate = document.createElement("div");
    bottomCardTemplate.setAttribute("class", "country-container");
    country.appendChild(bottomCardTemplate);
    let countryContent = document.createElement("div");
    countryContent.setAttribute("class", "country-content");
    bottomCardTemplate.appendChild(countryContent);
    let countryLocation = document.createElement("div");
    countryLocation.setAttribute("class", "location");
    countryLocation.innerText = `${continentsName}`;
    countryContent.appendChild(countryLocation);
    let countryDegree = document.createElement("div");
    countryDegree.setAttribute("class", "loc-deg");
    countryDegree.innerText = `${countryTemperature}°C`;
    countryContent.appendChild(countryDegree);
    let countryTime = document.createElement("div");
    countryTime.setAttribute("class", "loc-time");
    countryTime.innerText = "delhi,10.10 A.M";
    setInterval(
      weatherDataOfSelectedCity.updateLiveTimeForEachCityList,
      1,
      countryName.toLowerCase(),
      countryTime
    );
    countryContent.appendChild(countryTime);
    let countryHumid = document.createElement("div");
    countryHumid.setAttribute("class", "loc-humid");
    let humidityImg = document.createElement("img");
    humidityImg.setAttribute(
      "src",
      "Assets/OneDrive_1_7-24-2022/humidityIcon.svg"
    );
    countryHumid.appendChild(humidityImg);
    let humidityText = document.createElement("span");
    humidityText.innerText = `${countryHumidity}`;
    countryHumid.appendChild(humidityText);
    countryContent.appendChild(countryHumid);
  }
  /**
   * changes the first letter of the string to capital
   *
   * @param {string} string string with lowercase
   * @return {string} gives the string with first letter as capital
   */
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  /**
   *
   * to get the continent name from the timezone
   * @param {string} city string with both continent and city name
   * @return {string} gives only the continent name
   */
  getContinentsName(city) {
    return city.split("/");
  }
}

var weatherDataOfSelectedCity = new selectedCityWeather();
function middle() {
  // Object.setPrototypeOf(selectedCityWeather.prototype,selectedCityData.prototype);
  //  Object.create(selectedCityData.prototype);
  // selectedCityWeather.prototype.constructor = selectedCityWeather;
  let weatherData = [];
  // for (let city in data) {
  //   weatherData.push(data[city].cityName.toLowerCase());
  // }
  weatherData = Object.entries(data);
  sunnyButtonIconElement = document.getElementById("sunny-btn");
  snowButtonIconElement = document.getElementById("snow-btn");
  windButtonIconElement = document.getElementById("wind-btn");
  /**
   * this method used to  the values of array based on the condition given
   * @param {object} [key, value]
   */

  sunnyData = weatherData.filter(
    ([key, value]) =>
      parseInt(value.temperature) > 29 &&
      parseInt(value.humidity) < 50 &&
      parseInt(value.precipitation) >= 50
  );
  snowData = weatherData.filter(
    ([key, value]) =>
      parseInt(value.temperature) > 20 &&
      parseInt(value.temperature) < 28 &&
      parseInt(value.humidity) > 50 &&
      parseInt(value.precipitation) < 50
  );
  windData = weatherData.filter(
    ([key, value]) =>
      parseInt(value.temperature) < 20 && parseInt(value.humidity) >= 50
  );
  //arrange the cities in descending order
  sunnyData.sort(function (first, second) {
    return parseInt(second[1].temperature) - parseInt(first[1].temperature);
  });
  snowData.sort(function (first, second) {
    return parseInt(second[1].precipitation) - parseInt(first[1].precipitation);
  });
  windData.sort(function (first, second) {
    return parseInt(second[1].humidity) - parseInt(first[1].humidity);
  });
  sunnyButtonIconElement.addEventListener("click", () => {
    weatherSelected = 'sunny-btn';
    weatherDataOfSelectedCity.updateButtonClicked("sunny-btn");
  });
  snowButtonIconElement.addEventListener("click", () => {
    weatherSelected='snow-btn';
    weatherDataOfSelectedCity.updateButtonClicked("snow-btn");
  });
  windButtonIconElement.addEventListener("click", () => {
    weatherSelected='wind-btn'
    weatherDataOfSelectedCity.updateButtonClicked("wind-btn");
  });
  addCardElement = document.getElementById("card-container");
  removeCardElement = document.getElementById("card-container");
  cityCount = document.getElementById("spin").value;
  displayCount;

  let spinner = document.getElementById("spin");
  //a function has been invoked when spinner value has been changed
  spinner.addEventListener(
    "change",
    weatherDataOfSelectedCity.checkSelectedButtonWithSpinnerValue
  );

  //this functions runs to display the value at the intial stage which has the value sunny button
  (() => {
    selectedIcon = "sunny";
    removeCardElement.replaceChildren();
    weatherSelected='sunny-btn';
    // weatherDataOfSelectedCity.createAppropriateCards();
    weatherDataOfSelectedCity.updateButtonClicked(weatherSelected);
  })();

  /**
   * a common function to update the humidity and precipitation values of the selected city in the card
   *
   * @param {string} valueToUpdate it has the image assest address
   * @param {object} climateSet it has the city name list
   * @param {number} iterate it has the count of the city
   * @param {string} weather it has the value whether it is humidity or precipitation
   * @param {string} UIAttribute it has the html tag's reference
   */
  const forwardImageIconElement = document.getElementById("forward-arrow");
  const backwardImageIconElement = document.getElementById("backward-arrow");

  //a function is stimulated to move the card when the backward icon is handled
  //if backward button is clicked then it asign value to 1 for a condition check
  backwardImageIconElement.addEventListener("click", () => {
    buttonClicked = 1;
    weatherDataOfSelectedCity.scrollArrowDirection();
  });
  //a function is stimulated to move the card when the forward icon is handled
  //if forward button is clicked then it asign value to 2 for a condition check
  forwardImageIconElement.addEventListener("click", () => {
    buttonClicked = 2;
    weatherDataOfSelectedCity.scrollArrowDirection();
  });
  continentArrow = document.getElementById("arrow-continent");
  temperatureArrow = document.getElementById("arrow-temperature");
  continentArrow.addEventListener("click", () => {
    let arrowToSortName =
      weatherDataOfSelectedCity.fetchTempArrowOrContinentArrow(
        "arrow-continent"
      );
    continentArrow.src =
      arrowToSortName == "arrowDown"
        ? "./Assets/OneDrive_4_7-24-2022/arrowUp.svg"
        : "./Assets/OneDrive_4_7-24-2022/arrowDown.svg";
    weatherDataOfSelectedCity.sortContinentsBasedOnConditions();
  });
  temperatureArrow.addEventListener("click", () => {
    let arrowToSortTemperature =
      weatherDataOfSelectedCity.fetchTempArrowOrContinentArrow(
        "arrow-temperature"
      );
    temperatureArrow.src =
      arrowToSortTemperature == "arrowDown"
        ? "./Assets/OneDrive_4_7-24-2022/arrowUp.svg"
        : "./Assets/OneDrive_4_7-24-2022/arrowDown.svg";
    weatherDataOfSelectedCity.sortContinentsBasedOnConditions();
  });
  country = document.getElementById("country");
  continents = [];
  continentsList = [];

  for (let cityName in data) {
    weatherDataOfSelectedCity.setTimeZone(data[cityName].timeZone);
    continents.push(weatherDataOfSelectedCity.getTimeZone());
  }
  continentsList = continents.map(weatherDataOfSelectedCity.getContinentsName);

  //display default continent list
  weatherDataOfSelectedCity.sortContinentsBasedOnConditions();
}
