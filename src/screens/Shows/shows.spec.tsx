import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import { Shows } from '.';

import { theme } from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockedShows = [
  {
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
  },
];

let mockedSearchShow = 'Test';

jest.mock('../../assets/calendar.svg', () => {
  return 'test';
});

const mockedLoadShows = jest.fn();
const mockedSetSearchShow = jest.fn();

jest.mock('../../hooks/useTVMaze', () => {
  return {
    useTVMaze() {
      return {
        shows: mockedShows,
        loadShows: mockedLoadShows,
        searchShow: mockedSearchShow,
        setSearchShow: mockedSetSearchShow,
      };
    },
  };
});

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation() {
      return {
        goBack: mockedGoBack,
      };
    },
  };
});

describe('Show Information Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<Shows />, {
      wrapper: Providers,
    });

    expect(getByTestId('shows-page')).toBeTruthy();
  });

  it('should render correctly the show items', () => {
    const { getAllByTestId } = render(<Shows />, {
      wrapper: Providers,
    });

    expect(getAllByTestId('show-item').length).toBe(1);
  });

  it('should call the load show function after render', () => {
    render(<Shows />, {
      wrapper: Providers,
    });

    expect(mockedLoadShows).toBeCalled();
  });

  it('should render the search', () => {
    const { getByTestId } = render(<Shows />, {
      wrapper: Providers,
    });

    expect(getByTestId('search')).toBeTruthy();
  });

  it('should not render the search if do not have it', () => {
    mockedSearchShow = '';
    const { queryByTestId } = render(<Shows />, {
      wrapper: Providers,
    });

    expect(queryByTestId('search')).toBeFalsy();
  });

  it('should call function clean searchShow', () => {
    mockedSearchShow = 'Test';
    const { getByTestId } = render(<Shows />, {
      wrapper: Providers,
    });

    const search = getByTestId('search');

    expect(search).toBeTruthy();

    fireEvent.press(search);

    expect(mockedSetSearchShow).toBeCalled();
  });
});
