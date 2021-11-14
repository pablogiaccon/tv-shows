import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { theme } from '../../global/styles/theme';
import { Season, useTVMaze } from '../../hooks/useTVMaze';

import * as S from './styles';

interface Props extends RectButtonProps {
  season: Season;
}

export function SeasonItem({ season, ...rest }: Props) {
  const { seasonSelected, setSeasonSelected } = useTVMaze();
  const { number } = season;
  const {
    colors: { secondary70, secondary50 },
  } = theme;

  const isChecked = seasonSelected === season.number;

  function handleSelectSeason() {
    setSeasonSelected(number);
  }

  return (
    <RectButton onPress={handleSelectSeason} {...rest}>
      <S.Container colors={[secondary50, secondary70]}>
        <S.Content checked={isChecked}>
          <S.Check checked={isChecked} />

          <S.SeasonNumber>{number}</S.SeasonNumber>
        </S.Content>
      </S.Container>
    </RectButton>
  );
}
