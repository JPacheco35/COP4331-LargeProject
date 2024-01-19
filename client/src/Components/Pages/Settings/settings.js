import React, { useEffect, useState } from "react";

import './settings.css';
import MainBar from '../../../Components/mainbar';
import SettingsBox from '../../../Components/settingsBox';
import ColorButton from '../../../Components/colorButton';
import loadColors from '../../../Components/loadColor';

import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
//import './App.css';

// Import Toasts
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";

export const ThemeContext = createContext("dark");


// This is the Settings Page of the Web Site
function Settings() {
    var palette, set;
    const [theme, setTheme] = useState("dark");

    const navigate = useNavigate()

    const authToken = async (e) => {
        // Get JWT token (if it exists)
        const token = { token: localStorage.getItem('token') }

        // No Token --> Boot the User to Homepage
        if (token.token == null) { navigate('/home') }

        // JWT exists --> Authenticate Token
        try {
            // Send token to Express Server
            var url = "http://192.241.132.66:5000/auth";
            await axios.post(url, token).
                then(async res => {
                    // Case: Bad JWT --> Boot user back to the homepage
                    if (res.status != 200) { navigate("/home") }

                    //document.getElementById("signedInAs").innerHTML = "Signed in as: " + res.data.data.firstname + " " + res.data.data.lastname;

                    try {
                        const json = { userID: res.data.data._id, }
                        console.log(json);

                        // Send token to Express Server
                        url = "http://192.241.132.66:5000/usercolor";
                        await axios.post(url, json).
                            then(res => {
                                palette = res.data.data;
                                set = loadColors(palette);
                                setTheme(set);
                                console.log(set);
                                console.log(theme);
                            });
                    } 
                    catch (error) { console.log(error); }
                })
        }

        catch (error) { console.log(error); }
    }

    


    // This is the function that is ran when the page is loaded for the first time
    useEffect(() => {

        authToken();

    }, []); // <-- empty array means 'run once'

    // We need to add the API Call to grab the color right here
    console.log(theme);
    return (
        <ThemeContext.Provider value={theme}>
            <div className="Settings" id={theme}>
              
                <MainBar backg={theme} />
                <SettingsBox>
                </SettingsBox>

                <ToastContainer />

            </div>
       </ThemeContext.Provider>
    );
}

export default Settings;