import React, { useState } from "react";
import Create from "./Create";
import Delete from "./Delete";
import List from "./Driver";

const Menu = () => {
  const [riders, setRiders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [showContent, setShowContent] = useState(true);

  const handleButtonClick = (endpoint) => {
    setRiders([]);
    setDrivers([]);
    setDestinations([]);
    setShowContent(false);
    let url = "";
    let setStateFunction = null;

    if (endpoint === "riders") {
      url = "http://localhost:3009/api/person/rider";
      setStateFunction = setRiders;
    } else if (endpoint === "drivers") {
      url = "http://localhost:3009/api/person/driver";
      setStateFunction = setDrivers;
    } else if (endpoint === "destinations") {
      url = "http://localhost:3009/api/destinations";
      setStateFunction = setDestinations;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStateFunction(data);
        setShowContent(true);
      })
      .catch((error) => console.error(error));
  };


  return (
    <div>
         <h1>Riley Airport Rides</h1>
        <div className="btn-group d-flex border-bottom">
           

            <button
                type="button"
                className="btn btn-primary mx-3 flex-fill"
                onClick={() => handleButtonClick("riders")}
            >
                Riders
            </button>

            <button
                type="button"
                className="btn btn-primary mx-3 flex-fill"
                onClick={() => handleButtonClick("drivers")}
            >
                Drivers
            </button>

            <button
                 type="button"
                className="btn btn-primary mx-3 flex-fill"
                onClick={() => handleButtonClick("destinations")}
            >
                Destinations
            </button>
        </div>

      {showContent && riders.length > 0 && (
        <div>
          <h2>Riders</h2>
          <ul>
            {riders.map((rider) => (
              <li key={rider.id}>
                <div>First Name: {rider.first_name}</div>
                <div>Last Name: {rider.last_name}</div>
                <div>Phone: {rider.cell_phone}</div>
                <div>Affiliation: {rider.affiliation}</div>
                <div>Arrival Date: {rider.arrival_date}</div>
                <div>Arrival Time: {rider.arrival_time}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {showContent && drivers.length > 0 && (
        <div>
          <h2>Drivers</h2>
          <ul>
            {drivers.map((driver) => (
              <li key={driver.id}>
                <div>First Name: {driver.first_name}</div>
                <div>Last Name: {driver.last_name}</div>
                <div>Phone: {driver.cell_phone}</div>
                <div>Affiliation: {driver.affiliation}</div>
                <div>Arrival Date: {driver.arrival_date}</div>
                <div>Arrival Time: {driver.arrival_time}</div>
              </li>
            ))}
          </ul>
       </div>
    )}
    {showContent && destinations.length > 0 && (
        <div>
          <h2>Destinations</h2>
          <ul>
            {destinations.map((destination) => (
              <li key={destination.id}>
               <div>Airport: {destination.airport}</div>
              </li>
            ))}
          </ul>
       </div>
    )}
</div>
  )}

  export default Menu;