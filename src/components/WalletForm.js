import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formApiRequest } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const obj = {
      id,
      value,
      description,
      currency,
      method,
      tag,
    };

    dispatch(formApiRequest(obj));
    this.setState({
      value: '',
      description: '',
      id: id + 1,
    });
  };

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <section className="pag-trybewallet">
        <form className="form-despesa">
          <label htmlFor="value">
            {'Valor: '}
            <input
              id="value"
              name="value"
              value={ value }
              data-testid="value-input"
              type="number"
              className="input-value"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency">
            {'Moeda: '}
            <select
              data-testid="currency-input"
              id="currency"
              name="currency"
              value={ currency }
              onChange={ this.handleChange }
            >
              {
                currencies.map((coin) => (
                  <option key={ coin } value={ coin }>{coin}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            {'Método de pagamento: '}
            <select
              name="method"
              id="method"
              value={ method }
              data-testid="method-input"
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="tag">
            {'Categoria: '}
            <select
              name="tag"
              id="tag"
              value={ tag }
              data-testid="tag-input"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <label htmlFor="description">
            {'Descrição: '}
            <input
              id="description"
              name="description"
              value={ description }
              data-testid="description-input"
              className="input-descricao"
              onChange={ this.handleChange }
            />
          </label>
        </form>
        <div className="btn-container">
          <button
            className="btn-despesa"
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar despesa
          </button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(String).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
