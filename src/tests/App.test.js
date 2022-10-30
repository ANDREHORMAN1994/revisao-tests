import {
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockCat from './helpers/mockCat';
import mockDog from './helpers/mockDog';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testando aplicacao', () => {
  beforeEach(() => {
    // jest.spyOn(global, 'fetch')
    //   .mockResolvedValueOnce({
    //     json: jest.fn().mockResolvedValue(mockCat),
    //   })
    //   .mockResolvedValue({
    //     json: jest.fn().mockResolvedValue(mockDog),
    //   });

    global.fetch = jest.fn(async (endpoint) => ({
      json: async () => {
        if (endpoint.includes('dog')) {
          return mockDog;
        }
        return mockCat;
      },
    }));

    global.alert = jest.fn().mockReturnValue('successful request!');
  });

  // it.todo('Verifica se os elementos aparecem na tela');
  it('Verifica se os elementos aparecem na tela', async () => {
    renderWithRouterAndContext(<App />);

    const btnLoginEl = screen.getByRole('button', { name: /add/i });

    userEvent.click(btnLoginEl);

    // GET BY
    const loadingEl = screen.getByText('loading', { exact: false });
    expect(loadingEl).toBeInTheDocument();

    // FIND BY
    // const titleEl = await screen.findByText('DOGS VS CATS');
    // expect(titleEl).toBeInTheDocument();

    // WAIT FOR
    // await waitFor(() => expect(screen.getByText('DOGS VS CATS')).toBeInTheDocument());

    // WAIT FOR ELEMENT
    await waitForElementToBeRemoved(loadingEl);

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert()).toBe('successful request!');

    const titleEl = screen.getByText('DOGS VS CATS');
    expect(titleEl).toBeInTheDocument();

    const imgEl = screen.getByAltText('animalImg');
    expect(imgEl).toBeInTheDocument();
    expect(imgEl).toHaveAttribute('src', 'https://cdn2.thecatapi.com/images/bl8.jpg');

    const animalTypeEl = screen.getByRole('heading', { name: 'CAT' });
    expect(animalTypeEl).toBeInTheDocument();

    const selectEl = screen.getByRole('combobox');
    expect(selectEl).toBeInTheDocument();
  });

  // it.todo('Verifica as funcionalidades da aplicação');
  it('Verifica as funcionalidades da aplicação', async () => {
    // global.fetch.mockRestore();

    // jest.spyOn(global, 'fetch')
    //   .mockResolvedValue({
    //     json: jest.fn().mockResolvedValue(mockDog),
    //   });

    renderWithRouterAndContext(<App />, '/animal');

    const titleEl = await screen.findByText('DOGS VS CATS');
    expect(titleEl).toBeInTheDocument();

    await screen.findByRole('img', { name: /animalimg/i });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.alert).toHaveBeenCalledTimes(1);

    const selectEl = screen.getByRole('combobox');
    expect(selectEl).toBeInTheDocument();
    userEvent.selectOptions(selectEl, 'Dog');

    await waitFor(() => screen.getByRole('img', { name: /animalimg/i }));
    expect(screen.getByRole('img', { name: /animalimg/i }))
      .toHaveAttribute('src', 'https://images.dog.ceo/breeds/retriever-curly/n02099429_2934.jpg');

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.alert).toHaveBeenCalledTimes(2);
  });

  // it.todo('Testa caso de erro');
  it('Testa caso de erro', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('DEU RUIM'));

    global.console.log = jest.fn();

    renderWithRouterAndContext(<App />, '/animal');

    await waitFor(() => {
      const message = 'Erro ao fazer a requisição: DEU RUIM';
      expect(global.console.log).toHaveBeenCalled();
      expect(global.console.log).toHaveBeenCalledWith(message);
    });
  });
});

// - FUNÇÃO AUXILIAR renderWithRouterAndContext

// - TESTAR ELEMENTOS NA TELA

// - TESTAR FUNCIONALIDADES

// - TESTE ASSINCRONO (find, waitFor, waitForElementToBeRemoved);

// - MOCK API - CASO DE SUCESSO;

// - MOCK API - CASO DE ERROR;

// - MOCK ALERTA;
