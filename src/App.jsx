import './App.css';
import { useState, useEffect } from 'react';

function App () {
  const [ pokemon, setPokemon ] = useState('')
  const [searchedPokemon, setSearchedPokemon] = useState('');

  const [ name, setName ] = useState('')
  const [ imageURL, setImageURL ] = useState('')

  const changePokemon = (event) => {
    event.preventDefault();
    if (pokemon.trim() !== "") {
      setSearchedPokemon(pokemon);
      setPokemon('');
    }
  }
  const handleWrongName = (event) => {
    event.preventDefault();
    alert('Pokemon no encontrado');
  };
  const getPokemonData = async () => {
    
    if (!searchedPokemon) {
      return ;
    }
    try {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`)

      result.json().then(response => {
        const name = response.name;
        const imageURL = response.sprites.other['official-artwork'].front_default;
        
        setName(name);
        setImageURL(imageURL);
        
        console.log('Name:', name);
        console.log('URL:', imageURL);
      })
    } catch (error) {
      console.error("Failed to fetch Pokemon:", error);
    }
    
  }

  useEffect(() => {
    getPokemonData()
  }, [searchedPokemon]);

  return(
  <>
    <form onSubmit={changePokemon}>
      <label htmlFor='pokemon'>Search for a Pokemon</label>
        <input 
        type="text"
        id="pokemon"
        name="pokemon"
        value={pokemon}
        onChange={(event) => setPokemon(event.target.value)}
        />
        <button type="submit">Search</button>
    </form>
    <p>{name ? name.toUpperCase() : null}</p>
    <img src={imageURL} alt={name} />
  </>
  )
};

export default App;
