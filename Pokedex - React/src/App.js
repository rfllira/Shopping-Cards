import React from "react"
import Pokedex from "./componentes/Pokedex"
import pokemons from "./data"
import "./App.css"

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Pokedex</h1>
        <Pokedex pokemons={ pokemons } />
      </div>
    )
  }
}

export default App;