import React, { useState } from "react";

const Menu = () => {
  const [destinations, setDestinations] = useState([]);

  const handleButtonClick = (endpoint) => {
    fetch(`http://localhost:3009/api/destinations/`)
      .then(response => response.json())
      .then(data => {
        setDestinations(data); // Update the state with the destinations data
      })
      .catch(error => console.error(error));

      .
      +6016

      
  }

  return (
    <div>
      <h1>Riley Airport Rides</h1>
      <button type="button" className="btn btn-primary mx-3" onClick={() => handleButtonClick("riders")}>Riders</button>
      <button type="button" className="btn btn-primary mx-3" onClick={() => handleButtonClick("drivers")}>Drivers</button>
      <button type="button" className="btn btn-primary mx-3" onClick={() => handleButtonClick("destinations")}>Destinations</button>

      <ul>
        {destinations.map(destination => (
          <li key={destination.id}>{destination.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
