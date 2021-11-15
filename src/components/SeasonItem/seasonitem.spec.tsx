import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import { SeasonItem } from '.';
import { theme } from '../../global/styles/theme';
import { Season } from '../../hooks/useTVMaze';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

let mockedSeasonItem = {};
const mockedSeasonSelected = 1;
const mockedSetSeasonSelected = jest.fn();

jest.mock('../../hooks/useTVMaze', () => {
  return {
    useTVMaze() {
      return {
        seasonSelected: mockedSeasonSelected,
        setSeasonSelected: mockedSetSeasonSelected,
      };
    },
  };
});

describe('Season Item Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    mockedSeasonItem = {
      id: 1,
      number: 1,
      episodeOrder: 1,
    };

    const { getByTestId } = render(
      <SeasonItem season={mockedSeasonItem as Season} />,
      { wrapper: Providers },
    );

    expect(getByTestId('season-item')).toBeTruthy();
  });

  it('should render correctly when it is selected', () => {
    mockedSeasonItem = {
      id: 1,
      number: 1,
      episodeOrder: 1,
    };

    const { getByTestId } = render(
      <SeasonItem season={mockedSeasonItem as Season} />,
      { wrapper: Providers },
    );

    expect(getByTestId('season-item').props.style[0].opacity).toEqual(1);
    expect(
      getByTestId('check-season-item').props.style[0].backgroundColor,
    ).toEqual(theme.colors.primary);
  });

  it('should render correctly when it not selected', () => {
    mockedSeasonItem = {
      id: 2,
      number: 2,
      episodeOrder: 1,
    };

    const { getByTestId } = render(
      <SeasonItem season={mockedSeasonItem as Season} />,
      { wrapper: Providers },
    );

    expect(getByTestId('season-item').props.style[0].opacity).toEqual(0.4);
    expect(
      getByTestId('check-season-item').props.style[0].backgroundColor,
    ).toEqual(theme.colors.secondary100);
  });

  it('should render correctly the number', () => {
    mockedSeasonItem = {
      id: 2,
      number: 2,
      episodeOrder: 1,
    };

    const { getByTestId } = render(
      <SeasonItem season={mockedSeasonItem as Season} />,
      { wrapper: Providers },
    );

    expect(getByTestId('season-item-number').children[0]).toEqual('2');
  });

  it('should set the season selected', () => {
    mockedSeasonItem = {
      id: 2,
      number: 2,
      episodeOrder: 1,
    };

    const { getByTestId } = render(
      <SeasonItem season={mockedSeasonItem as Season} />,
      { wrapper: Providers },
    );

    fireEvent.press(getByTestId('season-item-container'));

    expect(mockedSetSeasonSelected).toBeCalled();
  });
});
