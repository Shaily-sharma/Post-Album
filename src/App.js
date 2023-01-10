import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Album from "./components/albums/AlbumP";
import Postp from "./components/posts/Post";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
         <Route path="/AlbumP" element={<Album />} />
          <Route path="/post" element={<Postp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
