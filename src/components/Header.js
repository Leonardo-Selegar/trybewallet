import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  soma = () => {
    const { expenses } = this.props;
    const despesa = expenses.reduce((acc, cur) => {
      const moeda = cur.currency;
      const cambio = cur.exchangeRates[moeda].ask;
      const convertido = cambio * cur.value;
      return acc + convertido;
    }, 0.00);
    return despesa.toFixed(2);
  };

  render() {
    const { email } = this.props;
    const despesaTotal = this.soma();
    return (
      <div className="header">
        <div className="logo-titulo">
          <img src="https://cdn-icons-png.flaticon.com/512/1577/1577989.png" alt="icone do header" className="img" />
          <p className="titulo-header">TrybeWallet</p>
        </div>
        <div className="header-despesa">
          <p
            className="header-valor"
            data-testid="total-field"
          >
            {despesaTotal}
          </p>
          <p className="header-moeda" data-testid="header-currency-field">BRL</p>
        </div>
        <div className="header-perfil">
          <img src="https://cdn-icons-png.flaticon.com/512/64/64572.png" alt="icone de perfil" className="img-perfil" />
          <p className="header-email" data-testid="email-field">{email}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(String).isRequired,
};
