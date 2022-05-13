/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { Component } from "react"

class Pokedex extends Component {
  render() {
    const { pokemons } =this.props
    return (
      pokemons.map((pokemon, index) => {
        return (
        <div key={index} className="pokedex">
          <p> {pokemon.name} <br /> {pokemon.type} <br /> {`Average Weight: ${pokemon.averageWeight.value}Kg`} <br /> </p>
          <img src={pokemon.image} />
        </div>
        )
       }
      )
    )
  }
}

export default Pokedex