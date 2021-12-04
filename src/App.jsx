import { Route, Routes, BrowserRouter } from "react-router-dom";
import Intro from "./components/Intro";
import Dropdowns from "./components/Dropdowns"
import Navigation from "./components/Navigation";
import "./css/sigma.css";
import Root from "./components/Root";

function App () {
    return (
      <>
      <Navigation />
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro/>} />
          <Route path="/data" element={<Dropdowns/>} />
          <Route path="/test" element={<Root/>} />
        </Routes>
        </BrowserRouter>
      </>
    );
  }

export default App;