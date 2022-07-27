import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeExpense, editExpense } from '../actions';

class TableToWallet extends Component {
  render() {
    const { description, tag, method, id,
      value, currency, exchangeRates,
      editExpenseGlobal } = this.props;

    const { ask } = exchangeRates[currency];
    const expense = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };
    return (
      <tr>
        <td>{description}</td>
        <td>{tag}</td>
        <td>{method}</td>
        <td>{parseFloat(value).toFixed(2)}</td>
        <td>{exchangeRates[currency].name}</td>
        <td>{parseFloat(ask).toFixed(2)}</td>
        <td>{(value * ask).toFixed(2)}</td>
        <td>Real</td>
        <td>
          <button
            data-testid="edit-btn"
            type="button"
            onClick={ () => editExpenseGlobal(id, expense) }
          >
            Editar
          </button>
        </td>
      </tr>
    );
  }
}

TableToWallet.propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
  method: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  editExpenseGlobal: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
  exchangeRates: PropTypes.shape({
    name: PropTypes.string,
    ask: PropTypes.string,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  removeExpenseGlobal: (elemento) => dispatch(removeExpense(elemento)),
  editExpenseGlobal: (idToEdit, expense) => dispatch(editExpense(idToEdit, expense)),
});

export default connect(null, mapDispatchToProps)(TableToWallet);
