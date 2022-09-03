import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';

describe('Testando pagina de feedback', () => {
  const INITIAL_STATE = {
    player: {
      name: 'joãozinho',
      assertions: 3,
      score: 120,
      gravatarEmail: 'joao@123.com',
    },
  };

  it('se é renderizado todas as informações', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    expect(screen.getByTestId("feedback-text")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-total-score")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-total-question")).toBeInTheDocument();
    expect(screen.getByTestId("btn-play-again")).toBeInTheDocument();
  })
  it('se ao clicar no botão é renderizado para jogar novamente', () => {
    const {history} = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    userEvent.click(screen.getByTestId('btn-play-again'));
    expect(history.location.pathname).toBe('/');
    expect(screen.getByTestId('input-player-name')).toBeInTheDocument();
  })
  it('se ao clicar no botão é renderizado para pagina de ranking', () => {
    const {history} = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');
    const button = screen.getByTestId('btn-ranking');
    userEvent.click(button);
    expect(history.location.pathname).toBe('/ranking');
    expect(screen.getByTestId('btn-go-home')).toBeInTheDocument();
  })

  it('se aparece a mensagem de feedback positiva', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/feedback');

    const feedbackMessage = screen.getByText('Well Done!');
    expect(feedbackMessage).toBeInTheDocument();
  })

  it('se aparece a mensagem de feedback negativa', () => {
    const INITIAL_STATE2 = {
      player: {
        name: 'joãozinho',
        assertions: 2,
        score: 70,
        gravatarEmail: 'joao@123.com',
      },
    };
    renderWithRouterAndRedux(<App />, INITIAL_STATE2, '/feedback');

    const feedbackMessage = screen.getByText('Could be better...');
    expect(feedbackMessage).toBeInTheDocument();
  })
})
