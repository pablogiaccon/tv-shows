import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  height: 104px;
  padding-top: ${getStatusBarHeight()}px;
  padding-left: 24px;
  padding-right: 24px;

  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 20px;
  flex: 1;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.title700};
`;

export const Button = styled(BorderlessButton)`
  align-items: center;
  justify-content: center;
  padding: 12px;
`;
