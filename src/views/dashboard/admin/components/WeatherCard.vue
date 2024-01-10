<template>
  <div>
    <el-card v-loading="loading" class="weather-card" :body-style="{ padding: '0px' }">

      <div class="weather-card">
        <div class="top box-card-header">

          <img :src="img_url" alt="" class="background-image">
          <div class="data-body">

            <div class="current-day">
              <input v-model="city" type="text" class="city-search-form">
              <button @click="get_cities">Get</button>
              <div class="city-title">
                <span>{{ weather_data.name }}</span>
              </div>

              <div class="weather-icon">
                <svg-icon :icon-class="icon_class" />
              </div>

              <div class="weather-condition">
                <span>{{ weather_condition }}</span>
              </div>
              <div class="weather-description">
                <span>{{ weather_description }}</span>
              </div>

              <div class="temperature">
                <span>{{ temp }} °C</span>
              </div>

              <div class="min-max-temp">
                <div class="min">
                  <span>Min {{ this.temp_min }} °C</span>
                </div>

                <div class="max">
                  <span>Max {{ this.temp_max }} °C</span>
                </div>
              </div>

              <div class="refresh-button">

                <el-tooltip effect="dark" content="Refresh weather data" placement="top">
                  <button class="refresh-button" @click="get_weathers"><svg-icon icon-class="refresh" /></button>

                </el-tooltip>

              </div>

            </div>

            <div class="forecast">
              <div v-for="forcast in this.forecast_data">
                {{ forcast.dt_txt.split(" ") }}
              </div>
            </div>

          </div>

        </div>

      </div>

    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

import { Message } from 'element-ui'

export default {
  data() {
    return {
      api_key: '1f9d96b409e6b3d1f86d8468d20cc147',
      api_url: 'https://api.openweathermap.org/data/2.5/weather?q=',
      api_forecast_url: 'https://api.openweathermap.org/data/2.5/forecast?q=',
      icon_class: '',
      weather_data: [],
      img_url: '',
      city: '',
      weather: [],
      weather_condition: '',
      weather_description: '',
      temp_min: '',
      temp_max: '',
      temp: '',
      loading: false,
      cities: [],

      forecast_data: []

    }
  },

  mounted() {
    this.get_weathers()
    /*  this.get_forecast() */
  },
  methods: {
    get_cities() {
      this.loading = true
      axios({
        method: 'get',
        url: 'http://api.openweathermap.org/geo/1.0/direct?q=' + this.city + '&limit=5&appid=' + this.api_key

      }).then((response) => {
        console.log(response)
        this.cities = response.data
        this.loading = false
      })
    },

    get_weathers() {
      this.loading = true
      axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=1f9d96b409e6b3d1f86d8468d20cc147'
      }).then((response) => {
        this.weather_data = response.data
        this.weather = this.weather_data.weather
        this.weather_condition = this.weather[0].main
        this.weather_description = this.weather[0].description
        this.temp = Math.round(this.weather_data.main.temp)
        this.temp_min = Math.round(this.weather_data.main.temp_min)
        this.temp_max = Math.round(this.weather_data.main.temp_max)
        this.icon_url = this.icon_base_url + this.weather[0].icon + '@2x.png'

        switch (this.weather_data.weather[0].main) {
          case 'Clouds':
            this.icon_class = 'cloudy'
            this.img_url = require('@/assets/images/cloudy-2.jpg')
            break
          case 'Rain':
            this.icon_class = 'rainy'
            this.img_url = require('@/assets/images/rain-3.jpg')
            break
          case 'Clear':
            this.icon_class = 'sunny'
            this.img_url = require('@/assets/images/sunny-3.jpg')
            break
          case 'Snow':
            this.icon_class = 'snowy'
            this.img_url = require('@/assets/images/snow-1.jpg')
            break
          case 'Fog':
            this.icon_class = 'foggy'
            this.img_url = require('@/assets/images/fog-1.jpg')
            break
          case 'Drizzle':
            this.icon_class = 'rainy'
            this.img_url = require('@/assets/images/drizzle-1.jpg')
            break
          case 'Mist':
            this.icon_class = 'foggy'
            this.img_url = require('@/assets/images/mist-1.jpg')
            break
          case 'Smoke':
            this.icon_class = 'foggy'
            this.img_url = require('@/assets/images/smoke-1.jpeg')
            break
          case 'Haze':
            this.icon_class = 'haze'
            this.img_url = require('@/assets/images/haze-1.jpg')
            break
          case 'Thunderstorm':
            this.icon_class = 'thunderstorm'
            this.img_url = require('@/assets/images/thunderstorm-1.jpg')
            break
          case 'Dust':
            this.icon_class = 'dust'
            this.img_url = require('@/assets/images/dust-1.jpeg')
            break
          case 'Sand':
            this.icon_class = 'dust'
            this.img_url = require('@/assets/images/sand-1.jpg')
            break
          case 'Squall':
            this.icon_class = 'windy'
            this.img_url = require('@/assets/images/squall-1.jpg')
            break
          case 'Tornado':
            this.icon_class = 'tornado'
            this.img_url = require('@/assets/images/tornado-1.jpg')
            break
          default:
            this.icon_class = 'sunny'
            this.img_url = require('@/assets/images/default.webp')
            break
        }
        this.loading = false
      }).catch(function (error) {
        Message({
          message: error,
          type: 'error',
          duration: 5 * 1000
        })
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.box-card-header {

  position: relative;

  width: 100%;
  height: 300px;

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;

    transition: all 0.2s linear;

    &:hover {
      transform: scale(1.1, 1.1);
      filter: contrast(130%);
    }
  }

  .city-search-form {
    border: none;
    border-radius: 50px 50px 50px 50px;
    background-color: rgba($color: #f1f3f1, $alpha: 0.5);
    height: 20px;
    margin-left: 30%;
  }

  .city-search-form:focus {
    /*  background-color: rgba($color: #ffffff, $alpha: 1.0);
    height: 80px; */
    display: absolute;
  }

  .data-body {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 300px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    display: grid;
    grid-template-columns: 1fr 1fr;

    .span {
      font-family: "Roboto";
    }

    .city-title {
      text-align: center;
      font-size: 4em;
      font-weight: 300;
      color: aliceblue;
    }

    .weather-icon {
      text-align: center;
      font-size: 4em;
      margin-bottom: 2%;
      margin-top: -2%;
      color: white;
    }

    .weather-condition {
      text-align: center;
      margin-top: 2%;
      font-size: 2em;
      font-weight: 130;
      color: azure;
    }

    .weather-description {
      text-align: center;
      font-size: 1.3em;
      font-weight: 130;
      color: azure;
    }

    .temperature {
      text-align: center;
      font-size: 2em;
      font-weight: 200;
      color: white;
    }

    .min-max-temp {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10%;

      .min {
        text-align: center;
        font-size: 1.5em;
        font-weight: 120;
        color: white;
      }

      .max {

        text-align: center;
        font-size: 1.5em;
        font-weight: 120;
        color: white;

      }
    }

  }
}

.refresh-button {
  height: 30px;
  width: 30px;
  position: absolute;
  top: 0%;
  right: 0%;
  color: black;

  border-radius: 50%;
  border: none;
  transform: translateY(1px) translateX(-1px);
  opacity: 0.8;
}

.refresh-button:hover {
  opacity: 1.0;
  /* color: #f1f3f1; */
}

.weather-card-bottom {
  margin-top: 2%;
  padding: 2%;
}

.weather-card-bottom {
  padding: 10px 10px;

  .top-row {
    display: grid;
    grid-template-columns: auto auto;

  }

  .middle-row {
    margin-top: 2%;
    display: grid;
    grid-template-columns: auto auto;

    .weather-data {
      font-size: 1.5em;
    }
  }

  .bottom-row {
    margin-top: 2%;

    .weather-data {
      font-size: 1.5em;
    }
  }
}

@media only screen and (max-width:1024px) {
  .data-body {
    display: grid;
    grid-template-columns: 1fr;
  }
}

.weather-icon {
  transform: translateY(25px);
}
</style>
