import styled from 'styled-components/native';

export const Container = styled.View`
  width: 80%;
  height: 1px;
  background: ${({ theme }) => theme.colors.secondary40};
  margin: 20px 0;
  align-self: flex-end;
`;
