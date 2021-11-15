import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import { EpisodeDetails } from '.';
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
    useRoute() {
      return {
        params: {
          id: 1,
        },
      };
    },
  };
});

jest.mock('../../hooks/useTVMaze', () => {
  return {
    useTVMaze() {
      return {
        getEpisodeById() {
          return mockedEpisodeItem;
        },
      };
    },
  };
});

describe('Episode Details Screen', () => {
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

    const { getByTestId } = render(<EpisodeDetails />, {
      wrapper: Providers,
    });

    expect(getByTestId('episode-details')).toBeTruthy();
  });

  it('should render correctly the episode data', () => {
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

    const { getByTestId } = render(<EpisodeDetails />, { wrapper: Providers });

    expect(getByTestId('episode-item-name').children[0]).toBe('test');
  });

  it('should render a default image when there is not a image in episode data', () => {
    mockedEpisodeItem = {
      id: 1,
      name: 'test',
      season: 1,
      number: 1,
      airdate: 'test',
      runtime: 1,
      image: null,
      summary: 'test',
    };

    const { getByTestId } = render(<EpisodeDetails />, { wrapper: Providers });

    expect(getByTestId('default-image')).toBeTruthy();
  });

  it('should not render a default image when there is a image in episode data', () => {
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

    const { queryByTestId } = render(<EpisodeDetails />, {
      wrapper: Providers,
    });

    expect(queryByTestId('default-image')).toBeFalsy();
  });
});
