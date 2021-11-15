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
    <RectButton
      onPress={handleSelectSeason}
      {...rest}
      testID="season-item-container"
    >
      <S.Container colors={[secondary50, secondary70]}>
        <S.Content checked={isChecked} testID="season-item">
          <S.Check checked={isChecked} testID="check-season-item" />

          <S.SeasonNumber testID="season-item-number">{number}</S.SeasonNumber>
        </S.Content>
      </S.Container>
    </RectButton>
  );
}
