import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';
import 'jest-styled-components';

import { Text } from 'react-native';
import { Header } from '.';
import { theme } from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

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

describe('Header Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId } = render(<Header title="Title Test" />, {
      wrapper: Providers,
    });

    expect(getByTestId('header')).toBeTruthy();
  });

  it('should navigate to go back when click button go back', () => {
    const { getByTestId } = render(<Header title="Title Test" />, {
      wrapper: Providers,
    });

    fireEvent.press(getByTestId('button-go-back'));

    expect(mockedGoBack).toBeCalled();
  });

  it('should render the action component', () => {
    const { getByTestId } = render(
      <Header title="Title Test" action={<Text>Test Action</Text>} />,
      {
        wrapper: Providers,
      },
    );

    expect(getByTestId('action')).toBeTruthy();
  });

  it('should not render the action component when do not exists', () => {
    const { queryByTestId } = render(<Header title="Title Test" />, {
      wrapper: Providers,
    });

    expect(queryByTestId('action')).toBeFalsy();
  });

  it('should render the correct text in title', () => {
    const { getByTestId } = render(<Header title="Title Test" />, {
      wrapper: Providers,
    });

    expect(getByTestId('title').children[0]).toBe('Title Test');
  });
});
