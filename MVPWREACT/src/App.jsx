// import { useState } from 'react'
import React, {Fragment} from "react";
import './App.css'

//components

import Menu from "./Components/Menu";
import Create from "./Components/Create";

function App() {

  return (
    <>
    
      <Fragment>
        <div className = "container">
            <Menu/>
            <Create/>
        </div>
        
      </Fragment>
    </>
  )
}

export default App
