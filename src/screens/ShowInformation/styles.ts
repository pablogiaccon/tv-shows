import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;

  margin-top: ${getStatusBarHeight() + 10}px;
  padding: 12px;
`;

export const InformationContainer = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`;

export const Image = styled.Image`
  width: 136px;
  height: 200px;
  border-radius: 8px;
`;

export const Information = styled.View`
  margin-left: 12px;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.heading};
  font-size: 24px;
  font-family: ${({ theme }) => theme.fonts.title700};
  margin-bottom: 12px;
`;

export const Summary = styled.ScrollView`
  max-height: 180px;
  padding-right: 8px;
`;

export const SummaryText = styled.Text`
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.text400};
  text-align: justify;
`;

export const TextContainer = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 12px;
`;

export const Text = styled.Text`
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.text400};
`;
