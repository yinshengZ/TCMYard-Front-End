<template>
  <div>
    <el-card v-loading="loading" class="weather-card" :body-style="{ padding: '0px' }">

      <div class="top box-card-header">
        <img :src="this.img_url" alt="">
        <div class="refresh-button">
          <el-tooltip effect="dark" content="Refresh weather data.." placement="top">
            <el-button type="info" circle @click="get_weathers"> <svg-icon icon-class="refresh" /></el-button>
          </el-tooltip>

        </div>

      </div>

      <div class="weather-card-bottom">
        <div class="top-row">
          <div>
            <span class="city-name weather-data">{{ weather_data.name }} : </span>
            <span class="weather-data">{{ temp }} °C</span>
          </div>

          <div>
            <span class="weather-data">Feels Like: </span>
            <span class="weather-data">{{ Math.round(weather_data.main.feels_like) }}°C</span>

          </div>

        </div>

        <div class="middle-row">
          <div>

            <span class="weather-data">Max Temp: </span>
            <span class="weather-data">{{ Math.round(weather_data.main.temp_max) }}°C</span>

          </div>

          <div>
            <span class="weather-data">Min Temp: </span>
            <span class="weather-data">{{ Math.round(weather_data.main.temp_min) }}°C</span>
          </div>
        </div>

        <div class="bottom-row">
          <div>
            <span class="weather-data">Weather :</span>
            <span class="weather-data">{{ weather_condition }}</span>

            <span class="weather-data"> ({{ weather_description }})</span>

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
      icon_base_url: 'https://openweathermap.org/img/wn/',
      icon_name: '',
      icon_url: '',
      img_url: '',
      weather_data: [],
      city: '',
      weather: [],
      weather_condition: '',
      weather_description: '',
      temp: '',
      loading: false

    }
  },

  mounted() {
    this.get_weathers()
  },
  methods: {
    get_weathers() {
      this.loading = true
      axios({
        method: 'get',
        url: 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&units=metric&APPID=1f9d96b409e6b3d1f86d8468d20cc147'
      }).then((response) => {
        this.weather_data = response.data
        console.log(this.weather_data)
        this.weather = this.weather_data.weather
        this.weather_condition = this.weather[0].main
        this.weather_description = this.weather[0].description
        this.temp = Math.round(this.weather_data.main.temp)
        this.icon_url = this.icon_base_url + this.weather[0].icon + '@2x.png'
        console.log(this.weather)
        const ran = Math.floor(Math.random() * 5)

        switch (this.weather_data.weather[0].main) {
          case 'Clouds':

            this.img_url = require('@/assets/images/cloudy-1.jpg')
            break
          case 'Rain':
            this.img_url = require('@/assets/images/rain-1.jpg')
            break
          case 'Clear':
            this.img_url = require('@/assets/images/sunny-1.jpg')
            break
          case 'Snow':
            this.img_url = require('@/assets/images/snow-1.jpg')
            break
          case 'Fog':
            this.img_url = require('@/assets/images/fog-1.jpg')
            break
          case 'Drizzle':
            this.img_url = require('@/assets/images/drizzle-1.jpg')
            break
          case 'Mist':
            this.img_url = require('@/assets/images/mist-1.jpg')
            break
          case 'Smoke':
            this.img_url = require('@/assets/images/smoke-1.jpeg')
            break
          case 'Haze':
            this.img_url = require('@/assets/images/haze-1.jpg')
            break
          case 'Thunderstorm':
            this.img_url = require('@/assets/images/thunderstorm-1.jpg')
            break
          case 'Dust':
            this.img_url = require('@/assets/images/dust-1.jpeg')
            break
          case 'Sand':
            this.img_url = require('@/assets/images/sand-1.jpg')
            break
          case 'Squall':
            this.img_url = require('@/assets/images/squall-1.jpg')
            break
          case 'Tornado':
            this.img_url = require('@/assets/images/tornado-1.jpg')
            break
          default:
            this.img_url = require('@/assets/images/default.webp')
            break
        }
        this.loading = false
      }).catch(function(error) {
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
/* .box-card-header {
      padding: 0px 0px 0px 0px;
  } */

.box-card-header {
    position: relative;
    height: 220px;

    img {
        width: 100%;
        height: 100%;
        transition: all 0.2s linear;

        &:hover {
            transform: scale(1.1, 1.1);
            filter: contrast(130%);
        }
    }
}

/* .weather-card {
      display: grid;
      grid-template-columns: auto auto;
  } */

.heading {
    text-align: center;
    font-size: 2em;
    color: rgba(66, 64, 65, 0.28);
}

.refresh-button {
    position: absolute;
    top: 0%;
    left: 0%;

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

.city-name {
    font-size: 2em;
}

.weather-data {
    font-size: 2em;
    //margin-left: 5%;
    color: rgba(32, 83, 102, 0.39);
}

.weather-icon {
    transform: translateY(25px);
}

.icons {
    transform: translateY(-1px);
    font-size: 2em;
    margin-left: 2%;
    color: rgba(52, 62, 66, 0.39)
}
</style>
