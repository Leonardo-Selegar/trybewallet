import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, remove } = this.props;
    console.log(expenses);
    return (
      <table className="table-pag">
        <thead className="table">
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
        <tbody className="table">
          {expenses.map((despesa) => (
            <tr key={ despesa.id }>
              <td>{despesa.description}</td>
              <td>{despesa.tag}</td>
              <td>{despesa.method}</td>
              <td>{Number(despesa.value).toFixed(2)}</td>
              <td>{despesa.exchangeRates[despesa.currency].name}</td>
              <td>{Number(despesa.exchangeRates[despesa.currency].ask).toFixed(2)}</td>
              <td>
                {Number(despesa.value * despesa
                  .exchangeRates[despesa.currency].ask).toFixed(2)}
              </td>
              <td>Real</td>
              <td>
                <button
                  data-testid="delete-btn"
                  type="button"
                  className="botao-remove"
                  onClick={ () => remove(despesa) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  remove: (expense) => dispatch(removeExpense(expense)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(String).isRequired,
  remove: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
