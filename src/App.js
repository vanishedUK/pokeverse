import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Details from "./routes/PokemonDetails";
import Favourites from "./routes/Favourite";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
        <Route path="/favourites" element={<Favourites />} />
      </Routes>
    </Router>
  );
}
