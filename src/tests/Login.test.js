import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Test Login page', () => {
  it('testa o Login', () => {
    renderWithRouterAndRedux(<App />);
    const title = screen.getByRole('heading', { name: /login/i });
    expect(title).toBeInTheDocument();

    const email = screen.getByPlaceholderText(/Email/i);
    expect(email).toBeInTheDocument();

    const password = screen.getByPlaceholderText(/password/i);
    expect(password).toBeInTheDocument();

    const enterBtn = screen.getByRole('button');

    expect(enterBtn).toBeInTheDocument();
    expect(enterBtn.innerHTML).toBe('Entrar');

    userEvent.type(email, 'emailInvalido');
    userEvent.type(password, '123');

    expect(enterBtn).toBeDisabled();

    userEvent.type(email, 'email@email.com');
    userEvent.type(password, '123456');

    expect(enterBtn).not.toBeDisabled();
  });

  it('Testa a carteira', () => {
    renderWithRouterAndRedux(<Wallet />);

    const value = screen.getByTestId('value-input');
    const description = screen.getByTestId('description-input');
    const currency = screen.getByTestId('currency-input');
    const method = screen.getByTestId('method-input');
    const tag = screen.getByTestId('tag-input');
    const expense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const coin = screen.getByText(/brl/i);

    userEvent.click(expense);
    userEvent.type(description, 'comida');
    userEvent.type(value, '10');
    userEvent.click(currency, 'CAD');
    userEvent.click(method, 'Dinheiro');
    userEvent.click(tag, 'Lazer');

    expect(value).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(currency).toHaveAttribute('name', 'currency');
    expect(method).toHaveAttribute('name', 'method');
    expect(tag).toHaveAttribute('name', 'tag');
    expect(expense).toBeInTheDocument();
    expect(coin).toBeInTheDocument();
  });
});
