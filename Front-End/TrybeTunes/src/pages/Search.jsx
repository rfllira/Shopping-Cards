import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends Component {
  result = () => {
    const { artistName, searchAPIresult } = this.props;
    return (
      <div>
        <p>{`Resultado de álbuns de: ${artistName} `}</p>
        <AlbumCard searchAPIresult={ searchAPIresult } />
      </div>);
  }

  form = () => {
    const { onInputChange, isButtonDisabled, onSearchButtonClick,
      artistNameValue, notFound } = this.props;
    return (
      <main>
        <form>
          <input
            type="text"
            name="artistNameValue"
            id="2"
            value={ artistNameValue }
            data-testid="search-artist-input"
            onChange={ onInputChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
            onClick={ onSearchButtonClick }
          >
            Procurar
          </button>
        </form>
        {
          notFound
            ? <p>Nenhum álbum foi encontrado</p>
            : this.result()
        }
      </main>
    );
  }

  render() {
    const { loading } = this.props;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : this.form() }
      </div>
    );
  }
}

Search.propTypes = {
  artistName: PropTypes.string.isRequired,
  artistNameValue: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  notFound: PropTypes.bool.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSearchButtonClick: PropTypes.func.isRequired,
  searchAPIresult: PropTypes.shape().isRequired,
};

export default Search;
