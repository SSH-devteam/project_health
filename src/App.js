import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import RedirectHandler from "./routes/RedirectHandler";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/oauth" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
}

export default App;
