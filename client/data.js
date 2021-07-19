import axios from "axios";
import "regenerator-runtime/runtime";

const key = "c9657622c49b4e5a1e7254bbe26f56ed";
const getIP = "https://ipapi.co/json/";

export const fetchLocale = async () => {
  const res = await axios.get(getIP)

 
  const { latitude, longitude } = res.data;
 
  

  const response =
    await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${key}
    `);
   
  return response.data
};
