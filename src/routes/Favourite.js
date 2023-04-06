import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import PokemonCard from "../components/PokemonCard";
import { Container } from "react-bootstrap";

export default function Favourites() {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourites");
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  function removeFavourite(name) {
    setFavourites(favourites.filter((fav) => fav !== name));
  }

  return (
    <div>
      <Navigation />
      <Container>
        <h1>Favourites</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {favourites.map((fav) => (
            <div key={fav} className="mx-3 my-4">
              <PokemonCard name={fav} onRemove={removeFavourite} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
