import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;

    const arrayExpense = expenses.map((expense) => (
      expense.value * expense.exchangeRates[expense.currency].ask));

    const totalitExpense = (arrayExpense.length
       && arrayExpense.reduce((index, elemento) => index + elemento));

    return (
      <header>
        <span>
          <p data-testid="email-field">
            {email}
          </p>
        </span>
        <span data-testid="total-field">
          { totalitExpense.toFixed(2) }
        </span>
        <span data-testid="header-currency-field">
          BRL
        </span>
      </header>
    );
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  expenses: wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default connect(mapStateToProps)(Header);
