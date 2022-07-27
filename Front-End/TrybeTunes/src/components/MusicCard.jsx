import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    isFavorite: false,
  }

  componentDidMount() {
    const { favorites, trackId } = this.props;
    if (favorites.find((track) => track.trackId === trackId)) {
      this.setState({ isFavorite: true });
    }
  }

  addToFavorites = async () => {
    const { favorites, reload } = this.props;
    console.log(favorites);
    this.setState((previousState) => ({
      loading: true, isFavorite: !previousState.isFavorite,
    }));
    await addSong(this.props);
    this.removeSongFromFavorites();
    await reload();
    this.setState({ loading: false });
  }

  removeSongFromFavorites = async () => {
    const { isFavorite } = this.state;
    if (!isFavorite) {
      await removeSong(this.props);
    }
  }

  render() {
    const { previewUrl, trackName, trackId } = this.props;
    const { isFavorite, loading } = this.state;
    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {
          loading ? <Loading /> : (
            <label htmlFor={ trackId }>
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                id={ trackId }
                checked={ isFavorite }
                onChange={ this.addToFavorites }
              />
            </label>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  favorites: PropTypes.shape([{
    trackId: PropTypes.number.isRequired,
  }]).isRequired,
  reload: PropTypes.func.isRequired,
};

export default MusicCard;
