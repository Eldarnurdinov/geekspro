
import { useState } from 'react';
import { useEffect } from 'react';
import "./App.css"


const URL = "https://pokeapi.co/api/v2/pokemon/";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    const fetchPokemon = async () => {
      const res = await fetch(URL);
      const data = await res.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (item) => {
          const www = await fetch(item.url)
          return www.json();
        })
      )
      console.log(pokemonDetails, "---data---");
      setPokemons(pokemonDetails);
    }
    fetchPokemon();
  }, [])


  return (
    <div className='container'>
      <h1>Покемоны</h1>
      <div className='pokemon-container'>
        {pokemons.map((item)=>(
        <div key={item.id}  className='card'>
          <h2>{item.id}</h2>
          <img src={item.sprites.front_default} alt={item.name} />
          <h2>{item.name}</h2>

        </div>
        ))}

      </div>
    </div>
  )
}

export default App