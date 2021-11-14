import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Container = styled(LinearGradient)`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-right: 8px;
`;

interface Props {
  checked: boolean;
}

export const Content = styled.View<Props>`
  opacity: ${({ checked }) => (checked ? '1' : '0.4')};
  width: 46px;
  height: 46px;
  background: ${({ theme }) => theme.colors.secondary40};
  border-radius: 8px;
  padding: 3px 0;

  align-items: center;
  justify-content: space-between;
`;

export const Check = styled.View<Props>`
  width: 8px;
  height: 8px;
  background: ${({ checked, theme }) =>
    checked ? theme.colors.primary : theme.colors.secondary100};
  border-color: ${({ theme }) => theme.colors.secondary50};
  border-width: 1px;
  border-radius: 2px;
  align-self: flex-end;
  margin-right: 3px;
`;

export const SeasonNumber = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  flex: 1;
  margin-top: 8px;
`;
