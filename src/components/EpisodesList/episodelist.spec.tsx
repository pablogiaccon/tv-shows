import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import { EpisodesList } from '.';
import { theme } from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

let mockedEpisodeItem = {};

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

jest.mock('../../hooks/useTVMaze', () => {
  return {
    useTVMaze() {
      return {
        episodes: [mockedEpisodeItem],
      };
    },
  };
});

describe('Episode List Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    mockedEpisodeItem = {
      id: 1,
      name: 'test',
      season: 1,
      number: 1,
      airdate: 'test',
      runtime: 1,
      image: {
        medium: 'test',
        original: 'test',
      },
      summary: 'test',
    };
    const { getByTestId } = render(<EpisodesList />, { wrapper: Providers });

    expect(getByTestId('episode-list')).toBeTruthy();
  });

  it('should render correctly the item quantity', () => {
    mockedEpisodeItem = {
      id: 1,
      name: 'test',
      season: 1,
      number: 1,
      airdate: 'test',
      runtime: 1,
      image: {
        medium: 'test',
        original: 'test',
      },
      summary: 'test',
    };
    const { getAllByTestId } = render(<EpisodesList />, { wrapper: Providers });

    expect(getAllByTestId('episode-item').length).toBe(1);
  });
});
