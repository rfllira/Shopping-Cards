import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MissionCard extends Component {
  render() {
    const { name, year, country, destination } = this.props;
    return (
      <div data-testid="mission-card" className="missao">
        <p data-testid="mission-name" className="nome_missao">{ name }</p>
        <p data-testid="mission-year" className="ano_missao">{ year }</p>
        <p data-testid="mission-country" className="pais_missao">{ country }</p>
        <p data-testid="mission-destination" className="destin_missao">{ destination }</p>
      </div>
    );
  }
}

MissionCard.propTypes = {
  name: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
};

export default MissionCard;
