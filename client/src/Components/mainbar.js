import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from './Images/logo.png';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css'

function MainBar({ backg }) 
{
  
  // This is the function that is ran when the page is loaded for the first time
  useEffect(() => 
  {
    // const cookies = document.cookie.split("; ");
    // const cookieFirst = cookies.find((row) => row.startsWith("firstName=")).split("=")[1];
    // const cookieLast = cookies.find((row) => row.startsWith("lastName=")).split("=")[1];

    // document.getElementById("signedInAs").innerHTML = "Signed in as: " + cookieFirst + " " + cookieLast;
    // document.getElementById("signedInAs").innerHTML = "Signed in as: DEBUG."
    //console.log(document.getElementById("signedInAs").innerHTML);

  }, []); // <-- empty array means 'run once'

  // This function is called when the user hits the submit button
  const handleSubmit = (e) =>  
  {
    e.preventDefault();

    // Wipe the cookies
	  //document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });

    // Send us back to Home
    window.location = '/home';
  }


  // Logs the user out of the accoutn and sends them back to home
  const handleLogout = (e) =>
  {
    //console.log(localStorage.getItem("token"));
    
    // Remove the JWT Token 
    localStorage.removeItem("token");
    window.location = '/home';
  }

  
    return (
        <Navbar id={backg} expand='large' class="navbar">
      <Container>
        
        {/* Logo */}
        <img src={logo} width = "40px" height = "40px" className="HeaderLogo" alt="logo" />
        
        {/* Header */}
        <Navbar.Brand href="#"><h2> Movie Knight</h2></Navbar.Brand>
        
        {/* Who is Signed in Text */}
        <Navbar.Text id = "signedInAs">
        </Navbar.Text>

        {/* Log Out Button */}
        <Button variant="primary" type="submit" onClick = {handleLogout}>
            Log Out
        </Button>

      </Container>
    </Navbar>
  );
}

export default MainBar;