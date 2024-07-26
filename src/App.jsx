import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Pay from "./Pay";
import Nod from "./Nod";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/pay" element={<Pay />} />
          <Route exact path="/nod" element={<Nod />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
