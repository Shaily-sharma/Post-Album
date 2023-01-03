import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import TablePaginationActions from "./components/Page/Page";
import TablePaginationActionss from "./components/albums/componentss/AlbumP";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
         <Route path="/AlbumP" element={<TablePaginationActionss />} />
          <Route path="/page" element={<TablePaginationActions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
