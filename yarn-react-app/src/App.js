import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import WriteStory from "./pages/WriteStory";
import MainNav from "./Components/mainNav";

function App() {
  return (
    <div>
        <MainNav/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/WriteStory" element={<WriteStory/>}/>
            <Route path="/Login" element={<Login/>}/>
        </Routes>
    </div>
  );
}

export default App;
