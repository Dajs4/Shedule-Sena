import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css"

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Schedule from "./pages/schedule/Schedule";
import Add from "./pages/add/Add";
import Information from "./pages/information/Information";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública de login */}
        <Route path="/" element={<Login />} />

        {/* Rutas que se renderizarán dentro de MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/information" element={<Information />} />
          <Route path="/add" element={<Add />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

