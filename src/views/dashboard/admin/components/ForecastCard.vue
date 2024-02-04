<template>
    <div>

        <div class="forecast">


            <div v-for="weather_forecast in forecast_data" class="forecast-container">

                <div class="weather-icon" v-if="weather_forecast[0].weather == 'Clouds'">
                    <svg-icon icon-class="cloudy" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Rain'">
                    <svg-icon icon-class="rainy" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Clear'">
                    <svg-icon icon-class="sunny" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Snow'">
                    <svg-icon icon-class="snowy" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Fog'">
                    <svg-icon icon-class="foggy" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Drizzle'">
                    <svg-icon icon-class="rainy" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Mist'">
                    <svg-icon icon-class="foggy" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Smoke'">
                    <svg-icon icon-class="foggy" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Haze'">
                    <svg-icon icon-class="haze" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Thunderstorm'">
                    <svg-icon icon-class="thunder" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Dust'">
                    <svg-icon icon-class="dust" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Sand'">
                    <svg-icon icon-class="dust" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Squall'">
                    <svg-icon icon-class="windy" class="icon"></svg-icon>
                </div>
                <div class="weather-icon" v-else-if="weather_forecast[0].weather == 'Tornado'">
                    <svg-icon icon-class="tornado" class="icon"></svg-icon>
                </div>

                <div class="weather-icon" v-else>
                    <svg-icon icon-class="sunny" class="icon"></svg-icon>
                </div>

                <div class="weather-heading">
                    <span class="weather">
                        {{ weather_forecast[0].weather }}
                    </span>
                </div>

                <div class="weather-temp">
                    <span class="temp">
                        {{ weather_forecast[0].temp }} °C
                    </span>
                </div>

                <div class="forecast-date">
                    <span class="date">
                        {{ weather_forecast[0].date }}
                    </span>
                </div>


            </div>


        </div>

    </div>
</template>

<script>

import Axios from 'axios'

export default {
    props: ['lat', 'lon'],
    data() {
        return {

            forecast: {},
            forecast_hourly: {
                time: '',
                weather: '',
                temp: '',
                temp_max: '',
                temp_min: ''
            },

            forecast_daily: [],
            forecast_data: [],
            img_url: '',
            icon_url: '',
            api_key: process.env.VUE_APP_OPENWEATHER_API_KEY,

        }
    },

    mounted() {
        this.get_forecast()
    },


    methods: {

        get_forecast() {
            Axios({
                method: 'get',
                url: 'https://api.openweathermap.org/data/2.5/forecast?lat='
                    + this.lat + '&lon=' + this.lon + '&units=metric&cnt=40&appid='
                    + this.api_key

            }).then((response) => {

                this.forecast = response.data.list

                const date = this.forecast[0].dt_txt.split(' ')
                let initial_date = date[0]
                let forecast_daily_index = 0

                let forecast_index = 0

                this.forecast.forEach(element => {
                    const forecast_date = element.dt_txt.split(' ')

                    if (forecast_date[0] != initial_date) {
                        initial_date = forecast_date[0]
                        // reset forecast_daily_index to 0 as forecast entered a new day
                        forecast_daily_index = 0

                        // using this.$set to make the array reactive. directly assigning will not be rendered correctly
                        this.$set(this.forecast_data, forecast_index, this.forecast_daily)
                        // adding a new day to the index
                        forecast_index++
                        this.forecast_daily = []
                    } else {
                        this.forecast_hourly = {}

                        this.forecast_hourly.weather = element.weather[0].main
                        let splitted_date = forecast_date[0].split("-", 3)
                        this.forecast_hourly.date = splitted_date[2] + '-' + splitted_date[1]
                        this.forecast_hourly.hour = forecast_date[1]
                        this.forecast_hourly.temp = Math.round(element.main.temp)
                        this.forecast_hourly.temp_min = Math.round(element.main.temp_min)
                        this.forecast_hourly.temp_max = Math.round(element.main.temp_max)

                        this.forecast_daily[forecast_daily_index] = this.forecast_hourly

                        forecast_daily_index++
                    }
                })

                console.log(this.forecast_data)
            })
        }

    }

}

</script>

<style scoped lang="scss">
.forecast {
    border-radius: 10px;

    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 2%;

    .forecast-container {
        margin-right: 10%;
        background-color: rgba($color: #ffffff, $alpha: 0.2);
        height: 100%;
        border-radius: 10px;
        position: relative;

        .weather-icon {
            padding: 10px;
            /* display: flex;
            justify-content: center; */
            position: relative;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            top: 5%;
            text-align: center;



            .icon {

                color: white;

                font-size: 4em;
            }
        }

        .weather-heading {
            padding: 10px;


            position: relative;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            top: 2%;
            text-align: center;

            .weather {
                display: flex;
                justify-content: center;
                font-size: 2em;
                color: white;
            }
        }

        .weather-temp {
            padding: 10px;

            position: relative;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            top: 1%;
            text-align: center;

            .temp {
                /*  display: flex;
                justify-content: center; */
                font-size: 2em;
                color: white;

            }
        }

        .forecast-date {
            position: relative;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            bottom: -3%;
            text-align: center;

            .date {
                margin-top: 10%;
                color: white;
                font-size: 2em;
            }
        }


    }


}

.forecast-container:hover {
    background-color: rgba($color: #d3d3d3, $alpha: 0.4);

}
</style>
