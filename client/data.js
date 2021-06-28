import axios from 'axios'
import $ from 'jquery'
import "regenerator-runtime/runtime"

const getIP = 'http://ip-api.com/json/'
const openWeatherMap = 'http://api.openweathermap.org/data/2.5/weather'

export const fetchLocale = async () => {
    const res = await axios.get(getIP)

    

    const { lat, lon } = res.data

    



    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c9657622c49b4e5a1e7254bbe26f56ed
    `)

    return {
        1: res.data,
        2: response.data
    }


    
    


    $.getJSON(getIP).done(function(location) {
        // console.log(location)
      $.getJSON(openWeatherMap, {
            lat: location.lat,
            lon: location.lon,
            units: 'metric',
            APPID: 'c9657622c49b4e5a1e7254bbe26f56ed'
        }).done(function(weather) {
            weather
            // console.log(weather)
            
        })
    })



}
