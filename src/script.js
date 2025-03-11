/* Fetching Data from OpenWeatherMap API */
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
        document.querySelector(".humidity").innerText =
          "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText =
          "Wind speed: " + speed + " km/h";
        document.querySelector(".weather").classList.remove("loading");
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/1600x900/?" + name + "')";
      },
      search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
      },
    };

    document.querySelector(".theme-toggle").addEventListener("click", function () {
      document.body.classList.toggle("light-mode");
      
      // Change button icon based on mode
      if (document.body.classList.contains("light-mode")) {
          this.innerText = "🌞"; // Sun icon for light mode
          localStorage.setItem("theme", "light");
      } else {
          this.innerText = "🌙"; // Moon icon for dark mode
          localStorage.setItem("theme", "dark");
      }
  });
  
  // Preserve theme on page reload
  window.onload = function () {
      if (localStorage.getItem("theme") === "light") {
          document.body.classList.add("light-mode");
          document.querySelector(".theme-toggle").innerText = "🌞";
      }
  };
  










