import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import { ShowInformation } from '.';
import { theme } from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockedShow = {
  id: 1,
  name: 'test',
  type: 'test',
  language: 'test',
  genres: [''],
  status: 'test',
  premiered: 'test',
  ended: 'test',
  weight: 1,
  rating: {
    average: 1,
  },
  image: {
    original: 'test',
  },
  summary: 'test',
};

jest.mock('../../assets/calendar.svg', () => {
  return 'test';
});

const mockedLoadShowInformation = jest.fn();

jest.mock('../../hooks/useTVMaze', () => {
  return {
    useTVMaze() {
      return {
        show: mockedShow,
        loadShowInformation: mockedLoadShowInformation,
      };
    },
  };
});

describe('Show Information Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<ShowInformation />, {
      wrapper: Providers,
    });

    expect(getByTestId('show-information')).toBeTruthy();
  });

  it('should render correctly the show data', () => {
    const { getByTestId } = render(<ShowInformation />, {
      wrapper: Providers,
    });

    expect(getByTestId('show-name').children[0]).toBe('test');
  });

  it('should call the load show function after render', () => {
    render(<ShowInformation />, {
      wrapper: Providers,
    });

    expect(mockedLoadShowInformation).toBeCalled();
  });
});
