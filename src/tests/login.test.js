import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { tokenResponse } from '../../cypress/mocks/token';
import { loginAction } from '../redux/actions';

describe('Testando pagina de login', () => {

  it('Teste se os imputs aparecen na tela', () => {
    renderWithRouterAndRedux(<App />);
    const nome = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const btn = screen.getByTestId('btn-play');
    const btnSetting = screen.getByTestId('btn-settings');
    expect(nome).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute("disabled");
    expect(btnSetting).toBeInTheDocument();
  });

  it('Teste se BTN redireciona para pagina de configurações', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const btnSetting = screen.getByTestId('btn-settings');
    expect(btnSetting).toBeInTheDocument();
    userEvent.click(btnSetting);
    expect(history.location.pathname).toBe('/settings');
  });

  it('Teste se BTN play esta habilitado', () => {
    renderWithRouterAndRedux(<App />);
    const nome = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const btn = screen.getByTestId('btn-play');
    expect(btn).toHaveAttribute("disabled");
    userEvent.type(nome, 'joãozinho');
    userEvent.type(email, 'joao@123.com');
    expect(btn).not.toHaveAttribute("disabled");
    userEvent.click(btn);
  });

  it('Teste se BTN play redireciona para pagina de game', async () => {
    renderWithRouterAndRedux(<App />);
    const nome = screen.getByTestId('input-player-name');
    const email = screen.getByTestId('input-gravatar-email');
    const btn = screen.getByTestId('btn-play');
    userEvent.type(nome, 'joãozinho');
    userEvent.type(email, 'joao@123.com');
    userEvent.click(btn);
    expect(await screen.findByTestId('header-score')).toBeInTheDocument();
  });
}
)
