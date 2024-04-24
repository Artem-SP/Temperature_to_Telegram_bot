import { useState, useEffect } from "react";

import {
  WEATHER_API_KEY,
  TELEGRAM_BOT_KEY,
  CHAT_ID,
  SITY,
} from "../.env/constants";

import "./App.css";

function App() {
  const [temp, setTemp] = useState();

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?aqi=no&q=${SITY}&key=${WEATHER_API_KEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTemp(data.current.temp_c);
      });
  }, []);

  const handleSend = () => {
    fetch(
      `https://api.telegram.org/${TELEGRAM_BOT_KEY}/sendMessage?chat_id=${CHAT_ID}&text=${temp}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );
  };

  return (
    <>
      <div>{temp}</div>
      <button onClick={handleSend}>Send to Telegram</button>
    </>
  );
}

export default App;
