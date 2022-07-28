import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';

class Login extends Component {
    form = () => {
      const { isButtonDisabled, onInputChange, onLoginButtonClick } = this.props;
      return (
        <form>
          <input
            type="text"
            name="userName"
            id="3"
            data-testid="login-name-input"
            onChange={ onInputChange }
          />
          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ onLoginButtonClick }
            data-testid="login-submit-button"
          >
            Entrar
          </button>
        </form>);
    }

    render() {
      const { loading, redirect } = this.props;
      return (
        <div data-testid="page-login">
          { loading ? <Loading /> : this.form() }
          { redirect && <Redirect to="/search" /> }
        </div>
      );
    }
}

Login.propTypes = {
  redirect: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onLoginButtonClick: PropTypes.func.isRequired,
};

export default Login;
