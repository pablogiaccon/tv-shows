import styled from 'styled-components/native';

export const Container = styled.View`
  /* padding-left: 24px; */
  margin-top: 24px;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${({ theme }) => theme.colors.highlight};
  font-family: ${({ theme }) => theme.fonts.title500};
  margin-bottom: 4px;
`;

export const SeasonsList = styled.ScrollView`
  min-height: 50px;
  max-height: 50px;
`;
