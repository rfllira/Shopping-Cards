import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends Component {
  state = {
    currentAlbum: {
      albumImage: '',
      collectionName: '',
      artistName: '',
    },
    musicList: [],
    favorites: [],
  }

  async componentDidMount() {
    const { id } = this.props;
    const musicList = await getMusics(id);
    const favorites = await getFavoriteSongs();
    this.setState({
      favorites,
      musicList: musicList.slice(1),
      currentAlbum: {
        albumImage: musicList[0].artworkUrl100,
        collectionName: musicList[0].collectionName,
        artistName: musicList[0].artistName,
      } });
  }

  async reload() {
    const favorites = await getFavoriteSongs();
    return favorites;
  }

  render() {
    const { musicList, currentAlbum, favorites } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <div>
            <img src={ currentAlbum.albumImage } alt={ currentAlbum.collectionName } />
            <h1 data-testid="album-name">{ currentAlbum.collectionName }</h1>
            <h3 data-testid="artist-name">{ currentAlbum.artistName }</h3>
          </div>
          <div>
            {musicList.map((track) => (<MusicCard
              key={ track.trackName }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              favorites={ favorites }
              reload={ this.reload }
            />))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Album;
