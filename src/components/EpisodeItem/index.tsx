import React from 'react';
import { useNavigation } from '@react-navigation/native';

import CalendarSvg from '../../assets/calendar.svg';
import IconPng from '../../assets/icon.png';

import { Episode } from '../../hooks/useTVMaze';

import * as S from './styles';

interface Props {
  episode: Episode;
}

export function EpisodeItem({ episode }: Props) {
  const navigation = useNavigation();
  const { id, name, number, image, airdate } = episode;

  function handleGoToDetails() {
    navigation.navigate('EpisodeDetails' as never, { id } as never);
  }

  return (
    <S.Container onPress={handleGoToDetails}>
      {image ? (
        <S.Image
          source={{
            uri: image.medium,
          }}
          resizeMode="cover"
        />
      ) : (
        <S.Image source={IconPng} resizeMode="cover" />
      )}

      <S.Content>
        <S.Title>{name}</S.Title>

        <S.Footer>
          <S.EpisodeNumber>{number}</S.EpisodeNumber>

          <S.DateContainer>
            <CalendarSvg />

            <S.Date>{airdate}</S.Date>
          </S.DateContainer>
        </S.Footer>
      </S.Content>
    </S.Container>
  );
}
