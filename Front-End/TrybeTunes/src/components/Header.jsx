import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  state = {
    userName: '',
    loading: true,
  }

  componentDidMount() {
    this.setUserName();
  }

  setUserName = async () => {
    const result = await getUser();
    const userName = result.name;
    this.setState({ userName, loading: false });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        <ul>
          <li>
            <h3 data-testid="header-user-name">
              { loading ? <Loading /> : userName }
            </h3>
          </li>
          <li><Link to="/search" data-testid="link-to-search">Pesquisa</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
