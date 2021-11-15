import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import 'jest-styled-components';

import { Search } from '.';
import { theme } from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

let mockedSearchShow = '';
const mockedSetSearchShow = jest.fn();

jest.mock('../../hooks/useTVMaze', () => {
  return {
    useTVMaze() {
      return {
        setSearchShow: mockedSetSearchShow,
        searchShow: mockedSearchShow,
      };
    },
  };
});

describe('Search Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<Search />, { wrapper: Providers });

    expect(getByTestId('search-icon')).toBeTruthy();
  });

  it('should render the input with the search value searched', () => {
    mockedSearchShow = 'Test';
    const { getByTestId } = render(<Search />, { wrapper: Providers });

    expect(getByTestId('input-search').props.value).toEqual('Test');
  });

  it('should search with the term', () => {
    const { getByTestId } = render(<Search />, { wrapper: Providers });

    const input = getByTestId('input-search');
    const button = getByTestId('button-search');

    fireEvent.changeText(input, 'Test');
    fireEvent.press(button);

    expect(mockedSetSearchShow).toBeCalled();
  });
});
