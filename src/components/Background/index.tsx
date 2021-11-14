import React, { ReactNode } from 'react';
import { theme } from '../../global/styles/theme';

import * as S from './styles';

interface Props {
  children: ReactNode;
}

export function Background({ children }: Props) {
  const { colors } = theme;
  return (
    <S.Container colors={[colors.secondary80, colors.secondary100]}>
      {children}
    </S.Container>
  );
}
