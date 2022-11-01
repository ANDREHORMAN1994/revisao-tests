import userEvent from '@testing-library/user-event';
import App from '../App';
import mockCat from './helpers/mockCat';
import mockDog from './helpers/mockDog';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

import { requestApi } from '../pages/Animal.jsx';

const { screen, waitFor } = require('@testing-library/react');

describe('Testando aplicacao', () => {
  beforeEach(() => {
    global.alert = jest.fn().mockReturnValue('xablau');

    // global.fetch = jest.fn()
    //   .mockResolvedValueOnce({
    //     json: jest.fn().mockResolvedValue(mockCat),
    //   })
    //   .mockResolvedValue({
    //     json: jest.fn().mockResolvedValue(mockDog),
    //   });

    global.fetch = jest.fn(async (endpoint) => ({
      json: async () => {
        const endpointDog = 'https://dog.ceo/api/breeds/image/random';
        // const endpointCat = 'https://api.thecatapi.com/v1/images/search';

        if (endpoint === endpointDog) {
          return mockDog;
        }

        return mockCat;
      },
    }));
  });

  it('Verifica se os elementos aparecem na tela', async () => {
    renderWithRouterAndContext(<App />);

    // GET BY
    const btnEl = screen.getByRole('button', { name: /login/i });
    userEvent.click(btnEl);

    // WAIT FOR ELEMENT TO BE REMOVED
    // const Loading = screen.getByText('Loading', { exact: false });
    // await waitForElementToBeRemoved(Loading);

    // FIND BY
    // const titleEl = await screen.findByText('DOGS VS CATS');
    // expect(titleEl).toBeInTheDocument();

    // waitFor
    await waitFor(() => expect(screen.getByText('DOGS VS CATS')).toBeInTheDocument());

    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert()).toBe('xablau');

    const img = await screen.findByRole('img', { name: /animalimg/i });
    expect(img).toHaveAttribute('src', 'https://cdn2.thecatapi.com/images/BJRS3Kpxk.jpg');
    expect(img).toBeInTheDocument();

    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('Verifica as funcionalidades da aplicação', async () => {
    // global.fetch = jest.fn().mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mockDog),
    // });

    const { history } = renderWithRouterAndContext(<App />, '/animal');

    console.log(history.location.pathname);

    await waitFor(() => expect(screen.getByText('DOGS VS CATS')).toBeInTheDocument());

    expect(global.alert).toHaveBeenCalledTimes(1);

    const img = await screen.findByRole('img', { name: /animalimg/i });
    expect(img).toBeInTheDocument();

    const selectEL = screen.getByRole('combobox');
    expect(selectEL).toBeInTheDocument();

    userEvent.selectOptions(selectEL, 'Dog');

    const img2 = await screen.findByRole('img', { name: /animalimg/i });
    expect(img2).toHaveAttribute('src', 'https://images.dog.ceo/breeds/saluki/n02091831_1563.jpg');
    expect(img2).toBeInTheDocument();

    expect(global.alert).toHaveBeenCalledTimes(2);
  });

  it('Testa caso de erro', () => {
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('DEU RUIM'));
    renderWithRouterAndContext(<App />, '/animal');

    expect(requestApi()).rejects.toThrow(new Error('Endpoint is required'));
  });

  it('Testa caso LocalStorage', async () => {
    const email = { email: 'outro@trybe.com' };

    localStorage.setItem('user', JSON.stringify(email));

    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(email));

    renderWithRouterAndContext(<App />, '/animal');

    await waitFor(() => expect(screen.getByText('DOGS VS CATS')).toBeInTheDocument());

    expect(global.alert).toHaveBeenCalledTimes(1);

    screen.getByText('outro@trybe.com');

    expect(localStorage.getItem).toHaveBeenCalled();
  });

  it('Testa caso não tenha LocalStorage', async () => {
    jest.spyOn(Object.getPrototypeOf(global.localStorage), 'getItem')
      .mockReturnValue(JSON.stringify(''));

    renderWithRouterAndContext(<App />, '/animal');

    await waitFor(() => expect(screen.getByText('DOGS VS CATS')).toBeInTheDocument());

    expect(global.alert).toHaveBeenCalledTimes(1);

    screen.getByText('não existe email');

    expect(localStorage.getItem).toHaveBeenCalled();
  });
});
