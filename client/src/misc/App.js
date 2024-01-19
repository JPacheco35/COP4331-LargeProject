import HomeBar from './components/navbar';  
import HomeCard from './components/homecard';  
import './App.css';

import Login from "./login";
import Home from "./home";

import {
  BrowserRouter, Router,
  Routes,
  Route
} from "react-router-dom";


// This is the Homepage of the Web Site
function App() {
  return (

    <div className="App">

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home/>} />
        <Route path="login" element={<Login/>} />
        </Route>
      </Routes>
    </BrowserRouter>
   
    </div>
  );
}

export default App;
