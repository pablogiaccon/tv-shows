import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const ButtonSearch = styled(BorderlessButton)`
  padding: 12px;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  /* justify-content: center; */
  background: ${({ theme }) => theme.colors.overlay};
`;

export const SearchBox = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;

  margin-top: ${getStatusBarHeight() + 24}px;

  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  height: 56px;
`;

export const Input = styled.TextInput`
  flex: 1;
  height: 100%;
  padding: 0 24px;
`;

export const Button = styled(RectButton)`
  width: 64px;
  height: 100%;
  align-items: center;
  justify-content: center;
`;
