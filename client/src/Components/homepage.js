import React, { useEffect } from 'react';
import axios from "axios";

import Col from 'react-bootstrap/Col';
import CardItem from "./cardItem"
import HomeBar from './navbar';  
// import HomeCard from './/homecard';  
// import Layout from './/layout';  
// import MainTab from './/maintab';
//import './App.css';

// This is the Homepage of the Web Site
function Home() {

//   // This is the function that is ran when the page is loaded for the first time
//   useEffect(() => 
//   {


//   }, []); // <-- empty array means 'run once'
  return (
    
    <div className="homepage">
      <HomeBar/>
      <Col>
        <CardItem type = 'homepage'></CardItem>
      </Col>
    </div>
  );
}

export default Home;