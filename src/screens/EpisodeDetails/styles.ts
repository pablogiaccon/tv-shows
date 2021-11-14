import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;

export const Header = styled.View`
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

export const Image = styled.Image`
  width: 100%;
  height: 300px;
`;

export const Content = styled.View`
  padding: 12px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.title700};
  text-align: center;
`;

export const Information = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin: 12px 0 24px;
`;

export const InfoGroup = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: center;
  flex: 1;
`;

export const InfoText = styled.Text`
  color: ${({ theme }) => theme.colors.highlight};
  font-family: ${({ theme }) => theme.fonts.text400};
  margin-left: 12px;
`;

export const Season = styled.Text`
  text-align: right;
`;

export const Summary = styled.Text`
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.text400};
  text-align: justify;
`;
