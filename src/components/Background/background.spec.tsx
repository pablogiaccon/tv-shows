import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import 'jest-styled-components';

import { Text } from 'react-native';
import { Background } from '.';
import { theme } from '../../global/styles/theme';

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('Background Component', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(
      <Background>
        <Text>Text test</Text>
      </Background>,
      { wrapper: Providers },
    );

    expect(getByTestId('background')).toBeTruthy();
  });

  it('should render the correctly children', () => {
    const { getByTestId } = render(
      <Background>
        <Text testID="child">Text test</Text>
      </Background>,
      { wrapper: Providers },
    );

    expect(getByTestId('child').children[0]).toBe('Text test');
  });
});
