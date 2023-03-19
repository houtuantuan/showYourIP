import { useState, useEffect } from "react";
import React from "react";
import Map from "./components/Map";
import { DateTime } from "luxon";
import { BsFillMoonStarsFill, BsGithub, BsLinkedin } from "react-icons/bs";



function App() {
  const [myIp, setMyIp] = useState();
  const [position, setPosition] = useState();
  const [coordination, setCoordination] = useState({});
  const [darkMode, setDarkMode] = useState(false);


  function success(pos) {
    const crd = pos.coords;

    // console.log("Your current position is:");
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    setCoordination(crd);
  }

  console.log(myIp);
  useEffect(() => {
    const fetchIp = async () => {
      try {
        const response = await fetch(
          `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_IPIFY_KEY}`);
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        setMyIp(data);


      } catch (error) {
        console.log(error);
      }
    };
    fetchIp();

    navigator.geolocation.getCurrentPosition(success);

  }, [])



  useEffect(() => {
    const country = myIp && myIp.location.country.toLowerCase();
    console.log(country);
    const fetchPosition = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${country}`);
        if (!response.ok) throw new Error("Request failed");
        const data = await response.json();
        setPosition(data[0]);
        console.log(data[0]);

      } catch (error) {
        console.log(error);
      }
    };
    fetchPosition();
  }, [myIp])

  const now = DateTime.local();
  //console.log(now)
  let rezoned = now.setZone("America/New_York").toLocaleString();

  //console.log(rezoned);
  const dt = rezoned.toString();



  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="dark:bg-gray-500">
        <header className="h-20  flex bg-slate-300 dark:bg-gray-800 ">
          <BsFillMoonStarsFill onClick={() => setDarkMode(!darkMode)}
            className="mt-6 w-40 cursor-pointer" />
          <h1 className="py-5 mr-24 
          font-mono	
          font-bold	
          text-4xl w-full	
          text-center
          dark:text-gray-300	
          ">Get Your IP</h1>

        </header>
        <h1 className="text-2xl text-center font-serif p-3 dark:text-gray-100	">General Infomation</h1>
        <div className="flex justify-center">
          <div className=" grid grid-cols-2 w-88 dark:bg-gray-500	">
            {/* </div>
      <div className="bg-slate-100 grid grid-cols-5	"> */}
            <p className="col-start-1 dark:text-gray-100	">your IP:</p>
            <p className="col-start-2 dark:text-gray-100	">{myIp && myIp.ip}</p>
            <p className="col-start-1 dark:text-gray-100	">your ISP:</p>
            <p className="col-start-2 dark:text-gray-100	">{myIp && myIp.isp}</p>
            {/* </div>
      <div className="bg-slate-100 grid grid-cols-5	"> */}
            <p className="col-start-1 dark:text-gray-100	">local time:</p>
            <p className="col-start-2 dark:text-gray-100	">{now.toLocaleString(DateTime.DATETIME_MED)}</p>

            {/* <p>time in New York:{dt}</p> */}
            <p className="col-start-1 dark:text-gray-100	">Region:</p>
            <div className="col-start-2 flex">
              <span className="dark:text-gray-100	">{position && position.name.common}</span>
              <img className="h-4 m-1" src={position && position.flags.png} />

            </div>

          </div>
        </div>

        <div>
          <h1 className="text-2xl text-center font-serif p-3 mt-5 dark:text-gray-100	"> Your Location</h1>

          <Map
            lat={coordination.latitude}
            lng={coordination.longitude}
          />
        </div>
        <footer className=" text-center h-40">
          <p className="dark:text-gray-100	">Contact me:xiaoyan.hou@hotmail.com</p>
          <div className="flex justify-center">
            <BsGithub className="mx-2" />
            <BsLinkedin className="mx-2" />

          </div>

        </footer>
      </div>
    </div>
  );
}

export default App;
