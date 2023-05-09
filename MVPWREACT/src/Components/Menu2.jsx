import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import Create from "./Create";
import Delete from "./Delete";
import Rider from "./Rider";
import Driver from "./Driver";
import Destinations from "./Destinations";

const Menu2 = ({ handleRidersClick, handleDriversClick, handleDestinationsClick, handleCreateClick, handleDeleteClick }) => {
  const [showRider, setShowRider] = useState(false);
  const [showDriver, setShowDriver] = useState(false);
  const [showDestinations, setShowDestinations] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleMenuClick = (menu) => {
    setShowRider(menu === 'riders');
    setShowDriver(menu === 'drivers');
    setShowDestinations(menu === 'destinations');
    setShowCreate(menu === 'create');
    setShowDelete(menu === 'delete');
  };

  return (
    <div>
      <h1>Riley Airport Rides</h1>
      <img src="Fort Riley.jpeg" alt="Fort Riley" />
      <h3>Welcome to Riley Airport Rides! </h3>
      <p>This is a free program to allow for Soldiers, their families as well as the local University students to be
         able to find rides to the local airports.  The two main international aiports are over two hours away and I've disovered
         there are many Soldiers that do not have transportation. </p>
         <p>If you are headed to the aiport and want to give a ride to a Soldier Create an Account so they can find you.</p>
      <div className="btn-group d-flex border-bottom my-3">
        <button
          type="button"
          className="btn btn-primary mx-3 flex-fill"
          onClick={() => handleMenuClick('riders')}
        >
          Riders
        </button>

        <button
          type="button"
          className="btn btn-primary mx-3 flex-fill"
          onClick={() => handleMenuClick("drivers")}
        >
          Drivers
        </button>

        <button
          type="button"
          className="btn btn-primary mx-3 flex-fill"
          onClick={() => handleMenuClick("destinations")}
        >
          Destinations
        </button>
      </div> 

      <div className="btn-group d-flex border-bottom">
        <button
          type="button"
          className="btn btn-primary mx-3 flex-fill"
          onClick={() => handleMenuClick("create")}
        >
          Add Account
        </button>

        <button
          type="button"
          className="btn btn-primary mx-3 flex-fill"
          onClick={() => handleMenuClick("delete")}
        >
          Delete Account
        </button>
      </div>

      {showRider && <Rider handleRidersClick={handleRidersClick} />}
      {showDriver && <Driver handleDriversClick={handleDriversClick} />}
      {showDestinations && <Destinations handleDestinationsClick={handleDestinationsClick} />}
      {showCreate && <Create handleCreateClick={handleCreateClick} />}
      {showDelete && <Delete handleDeleteClick={handleDeleteClick} />}
    </div>
  );
};

export default Menu2;
