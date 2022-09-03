import React from 'react';
import {
    screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import questionsResponse from './mocks/mockQuestions';

describe('Testa página de Ranking', () => {
    const INITIAL_STATE = {
        player: {
            name: 'joãozinho',
            assertions: 3,
            score: 120,
            gravatarEmail: 'joao@123.com',
        },
    };

    it('verifica se ranking mostra todos os jogadores', async () => {
        renderWithRouterAndRedux( < App /> , INITIAL_STATE, '/feedback');
        const buttonPlayAgain = screen.getByTestId('btn-play-again');
        userEvent.click(buttonPlayAgain);

        const nome = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        const btn = screen.getByTestId('btn-play');
        userEvent.type(nome, 'zézinho');
        userEvent.type(email, 'ze@123.com');
        userEvent.click(btn);

        expect(await screen.findByTestId('header-profile-picture')).toBeInTheDocument();
        
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(await screen.findByTestId('btn-next'));
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(await screen.findByTestId('btn-next'));
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(await screen.findByTestId('btn-next'));
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(await screen.findByTestId('btn-next'));
        userEvent.click(await screen.findByTestId('correct-answer'));
        userEvent.click(await screen.findByTestId('btn-next'));

        const buttonRanking = await screen.findByTestId('btn-ranking');
        userEvent.click(buttonRanking);
        expect(await screen.findAllByAltText('gravatar')).toHaveLength(2);
    });

    it('verifica se botão go-home leva ao login', async () => {
        const { history } = renderWithRouterAndRedux( < App /> , INITIAL_STATE, '/feedback');
        const buttonRanking = await screen.findByTestId('btn-ranking');
        userEvent.click(buttonRanking);

        userEvent.click(screen.getByTestId('btn-go-home'));
        expect(history.location.pathname).toBe('/');
    });
});