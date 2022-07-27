import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createLogin } from '../actions';

class Login extends React.Component {
  state = {
    buttonDisabled: true,
    email: '',
    password: '',
  }

  changeButtonEnable = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value },
      () => this.disabledButton());
  };

  disabledButton = () => {
    const { email, password } = this.state;
    const inputCaracters = 6;
    const acessEmail = 0;
    if (this.habilitarEmail(email) > acessEmail
    && password.length >= inputCaracters) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  clickButtonEnable = () => {
    const { email } = this.state;
    const { history, submitEmail } = this.props;
    submitEmail(email);
    history.push('/carteira');
  }

  habilitarEmail(email) {
    const caractersRegex = /\S+@\S+com/;
    return caractersRegex.test(email);
  }

  render() {
    const { email, password, buttonDisabled } = this.state;
    const { changeButtonEnable, clickButtonEnable } = this;
    return (
      <div className="form">
        <div className="login-form">
          <div className="loginInput-email">
            <input
              data-testid="email-input"
              type="text"
              name="email"
              onChange={ changeButtonEnable }
              value={ email }
            />
          </div>
          <div className="loginInput-password">
            <input
              data-testid="password-input"
              type="password"
              name="password"
              onChange={ changeButtonEnable }
              value={ password }
            />
          </div>
          <button
            data-testid="login-submit-button"
            className="button"
            type="button"
            onClick={ clickButtonEnable }
            disabled={ buttonDisabled }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitEmail: (email) => dispatch(createLogin(email)),
});

Login.propTypes = {
  submitEmail: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,

};

export default connect(null, mapDispatchToProps)(Login);
