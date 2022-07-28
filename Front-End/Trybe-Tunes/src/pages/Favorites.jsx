import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favorites: [],
    };

    this.reload = this.reload.bind(this);
  }

  async componentDidMount() {
    const favorites = await getFavoriteSongs();
    await this.reload();
    this.setState({ favorites });
  }

  setNewState = (favorites) => {
    this.setState({ favorites });
  }

  async reload() {
    const favorites = await getFavoriteSongs();
    this.setNewState(favorites);
    return favorites;
  }

  render() {
    const { favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          {favorites.map((track) => (<MusicCard
            key={ track.trackName }
            trackName={ track.trackName }
            previewUrl={ track.previewUrl }
            trackId={ track.trackId }
            favorites={ favorites }
            reload={ this.reload }
          />))}
        </div>
      </div>
    );
  }
}

export default Favorites;
