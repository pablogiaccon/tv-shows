import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  margin-top: 12px;
  padding: 0 12px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const Search = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 12px;
  border-radius: 8px;
`;

export const SearchText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.text400};
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 14px;
  margin-right: 12px;
`;

export const Total = styled.Text`
  font-family: ${({ theme }) => theme.fonts.text400};
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 14px;
  margin-left: auto;
`;
