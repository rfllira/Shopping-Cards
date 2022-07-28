import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addArrayExpense, actualExpense } from '../actions';

const INITIAL_STATE = {
  id: 0,
  value: '0',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class FormToWallet extends Component {
  state = {
    ...INITIAL_STATE,
  };

  inputHandleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  handleSubmit = () => {
    const { editor, addExpenseWallet } = this.props;

    if (editor) {
      const { expenseToEdit, updateExpenseAction, idToEdit: id } = this.props;
      updateExpenseAction({ ...expenseToEdit, ...this.state, id,
      });
      this.setState({ ...INITIAL_STATE });
    } else {
      addExpenseWallet(this.state);
      this.setState(({ id }) => ({ ...INITIAL_STATE, id: id + 1 }));
    }
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = this.props;
    const { inputHandleChange, handleSubmit } = this;

    return (
      <form>
        <div>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              type="text"
              id="value"
              name="value"
              value={ value }
              onChange={ inputHandleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              id="description"
              name="description"
              type="text"
              value={ description }
              onChange={ inputHandleChange }
            />
          </label>
        </div>
        <div>
          <label htmlFor="currency">
            Moeda:
            <select
              id="currency"
              name="currency"
              value={ currency }
              onChange={ inputHandleChange }
            >
              {currencies.map((currencie) => (
                <option
                  key={ currencie }
                >
                  {currencie}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Metodo de pagamento:
            <select
              data-testid="method-input"
              id="method"
              name="method"
              value={ method }
              onChange={ inputHandleChange }
            >
              <option value="Dinheiro">
                Dinheiro
              </option>
              <option value="Cartão de crédito">
                Cartão de crédito
              </option>
              <option value="Cartão de débito">
                Cartão de débito
              </option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Tag:
            <select
              data-testid="tag-input"
              id="tag"
              name="tag"
              value={ tag }
              onChange={ inputHandleChange }
            >
              <option value="Alimentação">
                Alimentação
              </option>
              <option value="Lazer">
                Lazer
              </option>
              <option value="Trabalho">
                Trabalho
              </option>
              <option value="Transporte">
                Transporte
              </option>
              <option value="Saúde">
                Saúde
              </option>
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={ handleSubmit }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  editor: wallet.editor,
  idToEdit: wallet.idToEdit,
  expenseToEdit: wallet.expenseToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  addExpenseWallet: (expense) => dispatch(addArrayExpense(expense)),
  updateExpenseAction: (expense) => dispatch(actualExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormToWallet);

FormToWallet.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  addExpenseWallet: PropTypes.func.isRequired,
  updateExpenseAction: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  expenseToEdit: PropTypes.shape({
    tag: PropTypes.string,
    method: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    value: PropTypes.string,
  }),
  idToEdit: PropTypes.number.isRequired,
};

FormToWallet.defaultProps = {
  expenseToEdit: {},
};
