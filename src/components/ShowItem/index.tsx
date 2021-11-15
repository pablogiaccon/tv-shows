import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import CalendarSvg from '../../assets/calendar.svg';
import IconPng from '../../assets/icon.png';

import { Show, useTVMaze } from '../../hooks/useTVMaze';

import * as S from './styles';
import { theme } from '../../global/styles/theme';

interface Props {
  show: Show;
}

export function ShowItem({ show }: Props) {
  const navigation = useNavigation();
  const { setShowSelected } = useTVMaze();
  const { name, image, rating, premiered } = show;

  function handleGoToDetails() {
    setShowSelected(show.id);

    navigation.navigate('ShowInformation' as never);
  }

  return (
    <S.Container onPress={handleGoToDetails} testID="show-item">
      {image ? (
        <S.Image
          source={{
            uri: image.medium,
          }}
          resizeMode="cover"
        />
      ) : (
        <S.Image source={IconPng} resizeMode="cover" testID="default-image" />
      )}

      <S.Content>
        <S.Title testID="show-item-name">{name}</S.Title>

        <S.Footer>
          <S.AverageContainer>
            <Feather name="star" color={theme.colors.primary} size={16} />

            <S.Average>{rating?.average}</S.Average>
          </S.AverageContainer>

          <S.DateContainer>
            <CalendarSvg />

            <S.Date>{premiered}</S.Date>
          </S.DateContainer>
        </S.Footer>
      </S.Content>
    </S.Container>
  );
}
