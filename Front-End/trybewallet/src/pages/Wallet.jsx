import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../actions';
import Header from '../components/Header';
import FormToWallet from '../components/formToWallet';
import TableToWallet from '../components/tableToWallet';

class Wallet extends Component {
  componentDidMount() {
    const { fetchApiArray } = this.props;
    fetchApiArray();
  }

  render() {
    const { expenses } = this.props;

    return (
      <>
        <Header />
        <FormToWallet />
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <thead>
            {expenses.map(((expense) => (
              <TableToWallet
                key={ expense.id }
                { ...expense }
              />
            )))}
          </thead>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  fetchApiArray: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};
const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  fetchApiArray: () => dispatch(fetchCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
