/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Button, Card, Col, Container, Row, ListGroup } from "react-bootstrap";

export default function Details() {
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const queryPokemon = new URLSearchParams(location.search).get("name");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${queryPokemon}`
        );
        const data = await response.json();
        console.log("Data fetched for", queryPokemon, data);
        setPokemon({
          name: data.name,
          image: data.sprites.front_default,
          height: data.height,
          weight: data.weight,
          abilities: data.abilities,
        });
        setError(false);
      } catch {
        setError(true);
      }
    }
    fetchPokemon();
  }, [queryPokemon]);

  function handleBackButtonClick() {
    navigate(-1);
  }

  return (
    <div>
      <Navigation />
      <Container>
        <h1>Details</h1>
        <Row className="justify-content-center mt-3">
          <Col md={6}>
            <Card>
              {pokemon ? (
                <>
                  <Card.Img
                    variant="top"
                    src={pokemon.image}
                    style={{ maxHeight: "300px", maxWidth: "300px" }}
                    className="mx-auto"
                  />
                  <Card.Body>
                    <Card.Title className="text-capitalize">
                      {pokemon.name}
                    </Card.Title>
                    <hr
                      style={{
                        border: ".65px solid #c4c4c4",
                      }}
                    />
                    <Card.Text>Height: {pokemon.height}</Card.Text>
                    <Card.Text>Weight: {pokemon.weight}</Card.Text>
                    <Card.Text>Abilities</Card.Text>
                    <ListGroup variant="flush">
                      {pokemon?.abilities?.length > 0 ? (
                        pokemon.abilities.map((ability, index) => (
                          <ListGroup.Item key={ability.ability.name}>
                            <span className="font-weight-bold">
                              {index + 1}.{" "}
                            </span>
                            <span className="text-capitalize">
                              {ability.ability.name}
                            </span>
                          </ListGroup.Item>
                        ))
                      ) : (
                        <ListGroup.Item>No abilities found.</ListGroup.Item>
                      )}
                    </ListGroup>
                  </Card.Body>
                </>
              ) : error ? (
                <Card.Text>Error</Card.Text>
              ) : (
                <Card.Text>Loading...</Card.Text>
              )}
              <Button onClick={handleBackButtonClick}>Back</Button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
