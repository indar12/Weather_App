/**
 * here it fetch cityname citytime citydate from the api and returns it
 *
 * @return {json} 
 */
 async function fetchCityNameAndTime() {
  let selectedCity = document.getElementById("city").value;
  let cityData = await fetch(`http://localhost:5000/city/?city=${selectedCity}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  return await cityData.json();
}

/**
 * here it fetch next five hours temperature from the api by passing cityname,citytime,citydate using post method
 *
 * @return {json} 
 */
async function fetchOnlyNextNHrs() {
  let cityData = await fetchCityNameAndTime();
  cityData.hours = 5;
  let nextNHrs = await fetch("http://localhost:5000/hourly-forecast", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(cityData),
  });
  let temperature = await nextNHrs.json();
  return temperature.temperature;
}

/**
 * here it returns the entire city data without cityname as key
 *
 * @return {json} 
 */
async function fetchEntireCityData() {
  let entireCityData = await fetch("http://localhost:5000/all-timezone-cities", {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });
  return await entireCityData.json();
}

export { fetchEntireCityData,fetchOnlyNextNHrs };

