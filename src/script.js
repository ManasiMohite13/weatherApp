let weather = {
  apiKey: "aba6ff9d6de967d5eac6fd79114693cc",
  fetchWeather: function (city) {
      fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
          .then((response) => {
              if (!response.ok) {
                  alert("No weather found.");
                  throw new Error("No weather found.");
              }
              return response.json();
          })
          .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;

      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
          "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");

      // 🌤️ Dynamic Backgrounds Based on Weather Conditions
      this.changeBackground(description);
  },
  changeBackground: function (description) {
      let weatherCondition = description.toLowerCase();
      let bgUrl = "";

      if (weatherCondition.includes("clear")) {
          bgUrl = "https://source.unsplash.com/1600x900/?sunny";
      } else if (weatherCondition.includes("cloud")) {
          bgUrl = "https://source.unsplash.com/1600x900/?cloudy";
      } else if (weatherCondition.includes("rain")) {
          bgUrl = "https://source.unsplash.com/1600x900/?rain";
      } else if (weatherCondition.includes("snow")) {
          bgUrl = "https://source.unsplash.com/1600x900/?snow";
      } else if (weatherCondition.includes("storm") || weatherCondition.includes("thunder")) {
          bgUrl = "https://source.unsplash.com/1600x900/?storm";
      } else {
          bgUrl = "https://source.unsplash.com/1600x900/?landscape";
      }

      document.body.style.backgroundImage = `url('${bgUrl}')`;
  },
  search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
  }
};

// 🌙 Light/Dark Mode Toggle
document.querySelector(".theme-toggle").addEventListener("click", function () {
  document.body.classList.toggle("light-mode");

  // Store the theme preference in localStorage
  if (document.body.classList.contains("light-mode")) {
      localStorage.setItem("theme", "light");
  } else {
      localStorage.setItem("theme", "dark");
  }
});

// Apply saved theme on load
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light-mode");
}

// Event Listeners for Weather Search
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
      weather.search();
  }
});

// Default weather on load
weather.fetchWeather("Mumbai");
