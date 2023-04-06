/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import PokemonCard from "../components/PokemonCard";
import { Alert, Container, FormControl, Row, Col } from "react-bootstrap";

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

export default function Home() {
  const [error, setError] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();

    async function fetchData() {
      try {
        const response = await fetch(pokeApi);
        const data = await response.json();
        setPokemonList(data.results);
        setError(false);
      } catch {
        setError(true);
      }
    }
  }, []);

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  const filteredPokemon = pokemonList
    ? pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div data-testid="app">
      <Navigation />
      <Container>
        <h1>Pokemon Index</h1>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={searchQuery}
          onChange={handleSearchQueryChange}
        />
        {error ? (
          <Alert variant="danger">
            Error: There was an error fetching the Pokemon data
          </Alert>
        ) : filteredPokemon.length === 0 ? (
          <Alert variant="warning">No Pokemon found.</Alert>
        ) : (
          <Row className="justify-content-md-center mt-3">
            {filteredPokemon.map((pokemon) => (
              <Col key={pokemon.url} md={3}>
                <PokemonCard name={pokemon.name} url={pokemon.url} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
