import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import { SeasonSelect } from '.';
import { theme } from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

const mockedSeasons = [{ id: 1, number: 1, episodeOrder: 1 }];

jest.mock('../../hooks/useTVMaze', () => {
  return {
    useTVMaze() {
      return {
        seasons: mockedSeasons,
      };
    },
  };
});

describe('Season Select Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<SeasonSelect />, { wrapper: Providers });

    expect(getByTestId('season-select')).toBeTruthy();
  });

  it('should render the correctly item quantity', () => {
    const { getAllByTestId } = render(<SeasonSelect />, { wrapper: Providers });

    expect(getAllByTestId('season-item').length).toBe(1);
  });
});
