import HomeBar from './components/navbar';  
import HomeCard from './components/homecard';  
import './App.css';
// import Main from './components/main';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import {Link} from "react-router-dom";

// This is the Homepage of the Web Site
function App() {
  return (

    <div className="App">
      
      {/* <p>Hello Test</p> */}
      <HomeBar/>
      <HomeCard/>

      {/* <Link to="/components/main">About</Link> */}

      {/* <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />

          <Route path="/about" element={<Main />} />
        </Routes>
      </Router> */}
   
      
    </div>
  );
}

export default App;
