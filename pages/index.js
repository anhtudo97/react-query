import { useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";
import axios from "axios";
import React from 'react'

const usePokemon = () => {
  return useQuery(
    "pokemon",
    async () => {
      return axios
        .get("https://pokeapi.co/api/v2/pokemon")
        .then((res) => res.data.results);
    },
    {
      // not updaing when you refocus on window
      refetchOnWindowFocus: false,

      // timeout reupdating date on window
      staleTime: 5000,

      // time to cache data on local use react-query
      cacheTime: 5000,
    }
  );
};

const Count = () => {
  const queryInfor = usePokemon();
  return <h3>You have looking {queryInfor.data?.length} pokemon</h3>;
};

const Pokemon = () => {
  const queryInfor = usePokemon();

  return queryInfor.isLoading ? (
    "loading ... "
  ) : queryInfor.isError ? (
    queryInfor.error.message
  ) : (
    <div>
      {queryInfor.data?.map((result) => {
        return <div key={result.name}>{result.name}</div>;
      })}
      <br />
      {queryInfor.isFetching ? "Updating" : null}
    </div>
  );
};

const PokemonSearch = ({ pokemon }) => {
  const queryInfor = useQuery(
    pokemon,
    async () => {
      return axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.data);
    },
    {
      // not updaing when you refocus on window
      refetchOnWindowFocus: false,

      // timeout reupdating date on window
      staleTime: 5000,

      // time to cache data on local use react-query
      cacheTime: 5000,
    }
  );
  return queryInfor.isLoading ? (
    "loading ... "
  ) : queryInfor.isError ? (
    queryInfor.error.message
  ) : (
    <div>
      {queryInfor.data?.sprites?.front_default ? (
        <img src={queryInfor.data.sprites.front_default} alt="" />
      ) : 'Pokemon not found'}
    </div>
  );
};

export default function App() {
  const [pokemon, setPokemon] = React.useState("");
  return (
    <div>
      <input value={pokemon} onChange={(e) => setPokemon(e.target.value)} />
      <PokemonSearch pokemon={pokemon} />
      {/* <Count />
      <Pokemon /> */}
      <ReactQueryDevtools />
    </div>
  );
}
