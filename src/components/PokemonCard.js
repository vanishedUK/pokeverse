import React, { useContext, useEffect, useState } from "react";
import { Button, Card, ListGroup, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FavoritesContext, FavoritesProvider } from "./FavoritesProvider";

export default function PokemonCard({ name, url }) {
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPokemon();

    async function fetchPokemon() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log("Data fetched for", url, data);
        setPokemon({
          abilities: data.abilities,
          sprites: data.sprites,
        });
        setError(false);
      } catch {
        setError(true);
      }
    }
  }, [url]);

  const handleDetailsClick = (event) => {
    event.preventDefault();
    navigate(`/details?name=${name}`);
  };

  return (
    <FavoritesProvider pokemonName={name}>
      <Card className="mb-3">
        <Card.Img variant="top" src={pokemon?.sprites?.front_default} />
        <Card.Body>
          <Button size="sm" variant="outline-info" onClick={handleDetailsClick}>Details</Button>
          <Card.Title style={{ marginTop: '10px' }} className="text-capitalize">{name}  </Card.Title>
          {error ? ( 
            <Card.Text>Error</Card.Text>
          ) : (
            <>
              <Card.Text>Abilities</Card.Text>
              <ListGroup variant="flush">
                {pokemon?.abilities?.length > 0 ? (
                  pokemon.abilities.map((ability, index) => (
                    <ListGroup.Item key={ability.ability.name}>
                      <span className="font-weight-bold">{index + 1}. </span>
                      <span className="text-capitalize">
                        {ability.ability.name}
                      </span>
                    </ListGroup.Item>
                  ))
                ) : (
                  <ListGroup.Item>No abilities found.</ListGroup.Item>
                )}
              </ListGroup>
              <ButtonGroup className="mt-2">
                <FavoritesButton pokemonName={name}/>
              </ButtonGroup>
            </>
          )}
        </Card.Body>
      </Card>
    </FavoritesProvider>
  );
}

function FavoritesButton({ pokemonName }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.some((pokemon) => pokemon.name === pokemonName);

  return (
    <Button
      variant={isFavorite ? "danger" : "primary"}
      onClick={() => toggleFavorite(pokemonName)}
    >
      {isFavorite ? "Remove from favourites" : "Add to favourites"}
    </Button>
  );
}
