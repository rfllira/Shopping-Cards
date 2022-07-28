import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    user: [],
    loading: false,
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    console.log(user);
    this.setState({ user, loading: false });
  }

  render() {
    const { loading, user: { name, email, description, image } } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
            <div>
              <img data-testid="profile-image" src={ image } alt={ image } />
              <Link to="/profile/edit">Editar perfil</Link>
              <h3>Nome</h3>
              <p>{name}</p>
              <h3>Email</h3>
              <p>{email}</p>
              <h3>Descrição</h3>
              <p>{description}</p>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
