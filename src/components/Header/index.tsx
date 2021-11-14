import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { theme } from '../../global/styles/theme';

import * as S from './styles';

interface Props {
  title: string;
  action?: ReactNode;
}

export function Header({ title, action }: Props) {
  const { goBack } = useNavigation();
  const { primary, secondary100, secondary40 } = theme.colors;

  return (
    <LinearGradient colors={[secondary100, secondary40]}>
      <S.Container>
        <S.Button onPress={goBack}>
          <Feather name="arrow-left" size={24} color={primary} />
        </S.Button>
        <S.HeaderTitle>{title}</S.HeaderTitle>

        {action ? <View>{action}</View> : <View style={{ width: 24 }} />}
      </S.Container>
    </LinearGradient>
  );
}
