import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  color: ${({ theme }) => theme.colors.secondary100};
  flex-direction: row;
  width: 100%;
`;

export const Image = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 20px;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 18px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const AverageContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Average = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.title500};
  font-size: 20px;
  margin-left: 8px;
`;

export const DateContainer = styled.View`
  align-items: center;
  flex-direction: row;
`;

export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.highlight};
  font-family: ${({ theme }) => theme.fonts.text400};
  margin-left: 12px;
`;
