import './App.css';
import { useState, useEffect } from 'react';

function App () {
  const [ pokemon, setPokemon ] = useState('')
  const [searchedPokemon, setSearchedPokemon] = useState(null);

  const [ name, setName ] = useState(null)
  const [ imageURL, setImageURL ] = useState('')

  const changePokemon = (event) => {
    event.preventDefault();
    if (pokemon.trim() !== "") {
      setSearchedPokemon(pokemon);
      setPokemon('');
    }
  }

  const handleWrongName = () => {
    alert('Pokémon not found. Please try again.');
    setName(null);
    setImageURL('');
  };

  useEffect(() => {
    if (searchedPokemon === null) {
      return;
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Pokémon not found');
        }
        return res.json();
      })
      .then(data => {
        setName(data.name);
        setImageURL(data.sprites.other['official-artwork'].front_default);
      })
      .catch(() => {
        handleWrongName();
      });
    }
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
    <div className='pokeDiv'>
      <p>{name && name.toUpperCase()}</p>
      {name && <img src={imageURL} alt={name} />}
    </div>
  </>
  )
};

export default App;
