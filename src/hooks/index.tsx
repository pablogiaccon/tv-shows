import React, { ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../global/styles/theme';
import { TVMazeProvider } from './useTVMaze';

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <ThemeProvider theme={theme}>
      <TVMazeProvider>{children}</TVMazeProvider>
    </ThemeProvider>
  );
}
