// This is used for routing to other webpages
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// This are the components for the other webpages
import Home from "./Components/Pages/Home/home";
import Login from "./Components/Pages/Login/login";
import Main from "./Components/Pages/Main/main";
import Settings from "./Components/Pages/Settings/settings";

// This is the Routing Layout for the application: 

// Home --> Homepage
// Login --> Login/Signup Page
// Main --> Logged in Page

// This is what is rendered at the very beginning of runtime 
export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* This Line adds element to ALL Routes */}
          <Route path="/" >

            {/* Each webpage and the route for that webapge (and what component to load) */}

            {/* --> This is the deafault route when the application is loaded */}
            <Route index element={<Home/>} /> 

            {/* These are the routes for each page */}
            <Route path="home" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="main" element={<Main />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
        </Routes>
      </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);