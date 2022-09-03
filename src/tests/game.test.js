import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import questionsResponse from './mocks/mockQuestions';
import userEvent from '@testing-library/user-event';

describe('Testa componente Game', () => {
    global.fetch = (url) => Promise.resolve({
        json: () => Promise.resolve(questionsResponse),
    });

    const INITIAL_STATE = {
        player: {
            name: 'joãozinho',
            assertions: 0,
            score: 0,
            gravatarEmail: 'joao@123.com',
        },
    };

    it('verifica se questões são renderizadas', async () => {
        renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
        
        const questionCategory = await screen.findByTestId('question-category');
        const questionText = await screen.findByTestId('question-text');
        const answerOptions = await screen.findByTestId('answer-options');
        
        expect(questionCategory).toBeInTheDocument();
        expect(questionText).toBeInTheDocument();
        expect(answerOptions).toBeInTheDocument();
    });

    it('verifica se é possível responder pergunta e avançar para próxima', async () => {
        renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

        const firstQuestionText = await screen.findByText('The Republic of Malta is the smallest microstate worldwide.');
        expect(firstQuestionText).toBeInTheDocument();
        
        const correctAnswer = await screen.findByTestId('correct-answer');
        userEvent.click(correctAnswer);

        const btnNext = await screen.findByTestId('btn-next');
        userEvent.click(btnNext);
        
        const secondQuestionText = await screen.findByText('In quantum physics, which of these theorised sub-atomic particles has yet to be observed?');
        expect(secondQuestionText).toBeInTheDocument();
    });

    it('verifica se pontuação aumenta corretamente ao acertar', async () => {
        renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
        
        const score = await screen.findByTestId('header-score');
        expect(score).toHaveTextContent('0');
        
        const firstCorrectAnswer = await screen.findByTestId('correct-answer');
        userEvent.click(firstCorrectAnswer);

        expect(score).toHaveTextContent('40');

        const firstBtnNext = await screen.findByTestId('btn-next');
        userEvent.click(firstBtnNext);

        const secondCorrectAnswer = await screen.findByTestId('correct-answer');
        userEvent.click(secondCorrectAnswer);
        
        expect(score).toHaveTextContent('140');
        
        const secondBtnNext = await screen.findByTestId('btn-next');
        userEvent.click(secondBtnNext);

        const thirdCorrectAnswer = await screen.findByTestId('correct-answer');
        userEvent.click(thirdCorrectAnswer);

        expect(score).toHaveTextContent('210');
    });

    it('verifica se questões têm cores corretas ao errar', async () => {
        renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

        const correctAnswer = await screen.findByTestId('correct-answer');
        const wrongAnswer = await screen.findByTestId('wrong-answer-0')
        userEvent.click(wrongAnswer);

        const correctStyle = window.getComputedStyle(correctAnswer);
        const wrongStyle = window.getComputedStyle(wrongAnswer);

        expect(correctAnswer.className).toBe('correct-answer');
        expect(wrongAnswer.className).toMatch(/wrong-answer/);
        expect(correctStyle._values.border).toBe('3px solid rgb(6, 240, 15)');
        expect(wrongStyle._values.border).toBe('3px solid red')
    });

    it('verifica o timer', async () => {
        renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

        const timer = await screen.findByTestId('timer');
        expect(timer).toBeInTheDocument();
        expect(timer).toHaveTextContent(30);

        await waitFor(() => expect(timer).toHaveTextContent(29));
    });
})