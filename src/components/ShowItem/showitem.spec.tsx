import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import { ShowItem } from '.';
import { theme } from '../../global/styles/theme';
import { Show } from '../../hooks/useTVMaze';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockedSetShowSelected = jest.fn();

jest.mock('../../assets/calendar.svg', () => {
  return 'test';
});

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation() {
      return {
        navigate: mockedNavigate,
      };
    },
  };
});

let mockedShow = {};

jest.mock('../../hooks/useTVMaze', () => {
  return {
    useTVMaze() {
      return {
        setShowSelected: mockedSetShowSelected,
      };
    },
  };
});

describe('Show Item Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    mockedShow = {
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
        medium: 'test',
        original: 'test',
      },
      summary: 'test',
    };
    const { getByTestId } = render(<ShowItem show={mockedShow as Show} />, {
      wrapper: Providers,
    });

    expect(getByTestId('show-item')).toBeTruthy();
  });

  it('should render a default image when there is not a image in show data', () => {
    mockedShow = {
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
      image: null,
      summary: 'test',
    };

    const { getByTestId } = render(<ShowItem show={mockedShow as Show} />, {
      wrapper: Providers,
    });

    expect(getByTestId('default-image')).toBeTruthy();
  });

  it('should not render a default image when there is a image in show data', () => {
    mockedShow = {
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
        medium: 'test',
        original: 'test',
      },
      summary: 'test',
    };

    const { queryByTestId } = render(<ShowItem show={mockedShow as Show} />, {
      wrapper: Providers,
    });

    expect(queryByTestId('default-image')).toBeFalsy();
  });

  it('should render correctly the show data', () => {
    mockedShow = {
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
        medium: 'test',
        original: 'test',
      },
      summary: 'test',
    };

    const { getByTestId } = render(<ShowItem show={mockedShow as Show} />, {
      wrapper: Providers,
    });

    expect(getByTestId('show-item-name').children[0]).toBe('test');
  });

  it('should set show selected and navigate', () => {
    mockedShow = {
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
        medium: 'test',
        original: 'test',
      },
      summary: 'test',
    };

    const { getByTestId } = render(<ShowItem show={mockedShow as Show} />, {
      wrapper: Providers,
    });

    fireEvent.press(getByTestId('show-item'));

    expect(mockedSetShowSelected).toBeCalled();
    expect(mockedNavigate).toBeCalled();
  });
});
