import React from 'react';
import { useTVMaze } from '../../hooks/useTVMaze';
import { SeasonItem } from '../SeasonItem';

import * as S from './styles';

export function SeasonSelect() {
  const { seasons } = useTVMaze();
  return (
    <S.Container testID="season-select">
      <S.Title>Seasons:</S.Title>

      <S.SeasonsList horizontal showsHorizontalScrollIndicator={false}>
        {seasons?.map(season => (
          <SeasonItem key={season.id} season={season} />
        ))}
      </S.SeasonsList>
    </S.Container>
  );
}
