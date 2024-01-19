import React, { useEffect, useState } from 'react';
import { createContext } from "react";

import './main.css';


import HomeBar from '../../../Components/navbar';  
import HomeCard from '../../../Components/homecard';  
import MainBar from '../../../Components/mainbar';
import MainTab from '../../../Components/maintab';
import loadColors from '../../../Components/loadColor';


import {Link, useNavigate} from 'react-router-dom';
import axios from "axios";
//import './App.css';

// Import Toasts
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export const ThemeContext = createContext("dark");


// This is the Homepage of the Web Site
function Main() 
{
    var palette;
    const [theme, setTheme] = useState("dark");
  const navigate = useNavigate()

  const authToken = async(e) => 
  {
    // Get JWT token (if it exists)
    const token =  { token: localStorage.getItem('token') }

    // No Token --> Boot the User to Homepage
    if( token.token == null) { navigate('/home') }

    // JWT exists --> Authenticate Token
    try 
    {
      // Send token to Express Server
      const url = "http://192.241.132.66:5000/auth";
      await axios.post(url,token).
      then(async res=>
      {
        // Case: Bad JWT --> Boot user back to the homepage
        if (res.status != 200) { navigate("/home") }

        document.getElementById("signedInAs").innerHTML = "Signed in as: " + res.data.data.firstname + " " + res.data.data.lastname;


          try {
              const json = { userID: res.data.data._id, }
              console.log(json);

              // Send token to Express Server
              var urls = "http://192.241.132.66:5000/usercolor";
              await axios.post(urls, json).
                  then(res => {
                      palette = res.data.data;
                      setTheme(loadColors(palette));
                      console.log("Check");
                      console.log(theme);
                      console.log("Palette");
                      console.log(loadColors(palette));

                  });
          }
          catch (error) { console.log(error); }
      });
    } 

    catch (error) { console.log(error); }
  }


  // This is the function that is ran when the page is loaded for the first time
  useEffect(() => 
  {

    authToken();

  }, []); // <-- empty array means 'run once'


    
  return (
    <ThemeContext.Provider value={theme}>
        <div className="Main" id={theme}>

              <MainBar backg={theme} />
          <MainTab/>
          <ToastContainer/>
      
        </div>
    </ThemeContext.Provider>
  );
}
  
export default Main;