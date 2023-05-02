import React, { useContext } from "react";
import Navigation from "../components/Navigation";
import PokemonCard from "../components/PokemonCard";
import { Container } from "react-bootstrap";
import { FavoritesContext } from "../components/FavoritesProvider";

export default function Favourites() {
  const { favorites } = useContext(FavoritesContext);

  return (
    <div>
      <Navigation />
      <Container>
        <h1>Favourites</h1>
        <div className="d-flex flex-wrap justify-content-center">
          {favorites.map((pokemon) => (
            <div key={pokemon.id} className="mx-3 my-4">
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
