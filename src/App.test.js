import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import App from './App';

describe('Testando aplicacao', () => {
  // it.todo('verificar elementos na tela');
  it('verificar elementos na tela', async () => {
    // jest.spyOn(global, 'alert')
    //   .mockImplementation(() => 'teste');

    global.alert = jest.fn(() => 'teste');
    render(<App />);

    // GET BY
    const loadingEl = screen.getByText('loading', { exact: false });
    expect(loadingEl).toBeInTheDocument();

    await waitForElementToBeRemoved(loadingEl);

    expect(alert).toHaveBeenCalledTimes(1);

    // FIND BY
    // const titleEl = await screen.findByText('DOGS VS CATS');
    // expect(titleEl).toBeInTheDocument();

    // WAIT FOR
    // await waitFor(() => expect(screen.getByText('DOGS VS CATS')).toBeInTheDocument());

    screen.getByText('DOGS VS CATS');
  });

  it.todo('verificar elementos assíncronos');
});

// - FUNÇÃO AUXILIAR renderWithRouter e Provider

// - MOCK API - CASO DE SUCESSO;

// - MOCK API - CASO DE ERROR;

// - MOCK ALERTA;

// - TESTE ASSINCRONO (find, waitFor ...);

// - ESPERAR ELEMENTOS APARECER NA TELA

// - TESTAR FORMS (INPUTS E SELECTS)
