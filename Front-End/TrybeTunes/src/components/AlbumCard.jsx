import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { searchAPIresult } = this.props;
    return (
      <div>
        { searchAPIresult.map((album) => (
          <div key={ album.collectionId }>
            <img src={ album.artworkUrl100 } alt={ album.collectionId } />
            <h2>{album.collectionName}</h2>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              {album.artistName}
            </Link>
          </div>
        )) }
      </div>
    );
  }
}

AlbumCard.propTypes = {
  searchAPIresult: PropTypes.shape([{
    artistName: PropTypes.string.isRequired,
    collectionId: PropTypes.number.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
  }]).isRequired,
};

export default AlbumCard;
