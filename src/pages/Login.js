import React from 'react';
import './login.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getEmail, fetchAPI } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  verifyBtn = () => {
    const { email, password } = this.state;
    const PASSWORD_LENGTH = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email);
    const verifyPassword = password.length >= PASSWORD_LENGTH;
    this.setState({ isBtnDisabled: !(verifyEmail && verifyPassword) });
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      this.verifyBtn();
    });
  };

  handleBtn = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(getEmail(email));
    dispatch(fetchAPI());
    history.push('/carteira');
  };

  render() {
    const { isBtnDisabled, email, password } = this.state;
    return (
      <section className="login-page">
        <div className="center">
          <h1 data-testid="login">Login</h1>
          <form>
            <div>
              <input
                className="input"
                placeholder="Email"
                type="email"
                data-testid="email-input"
                value={ email }
                name="email"
                onChange={ this.onInputChange }
              />
            </div>
            <div>
              <input
                className="input"
                placeholder="Password"
                type="password"
                data-testid="password-input"
                value={ password }
                name="password"
                onChange={ this.onInputChange }
              />
            </div>
            <button
              className="btn"
              type="submit"
              name="Entrar"
              disabled={ isBtnDisabled }
              onClick={ this.handleBtn }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

export default connect()(Login);

Login.propTypes = { history: PropTypes.shape({
  push: PropTypes.func.isRequired,
}).isRequired,
dispatch: PropTypes.func.isRequired,
};
