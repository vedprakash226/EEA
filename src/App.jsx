import "./App.css";
import React from "react";
import Navbar from "./components/Navbar.jsx";
import Team from "./pages/Team.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import ModernLoader from "./components/ModernLoader.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <ModernLoader>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/teams" element={<Team />} />
              <Route path="/EEA" element={<Home/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ModernLoader>
  );
}

export default App;
