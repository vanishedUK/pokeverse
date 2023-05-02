import React, { createContext, useState, useEffect } from "react";

export const FavoritesContext = createContext({
  favorites: [],
  toggleFavorite: () => {},
});

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(pokemonName) {
    setFavorites(prevFavorites => {
      const isFavorite = prevFavorites.some(pokemon => pokemon.name === pokemonName);
      if (isFavorite) {
        return prevFavorites.filter(pokemon => pokemon.name !== pokemonName);
      }
      return [...prevFavorites, { name: pokemonName, favorites: true }];
    });
  }
  

  //   Real time troubleshooting
  useEffect(() => {
    console.log("Favorites are now:", favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
