import React, { useMemo } from 'react';
import { useRoute } from '@react-navigation/native';

import { Feather } from '@expo/vector-icons';

import CalendarSvg from '../../assets/calendar.svg';
import IconPng from '../../assets/icon.png';

import { Background } from '../../components/Background';
import { useTVMaze } from '../../hooks/useTVMaze';

import * as S from './styles';
import { theme } from '../../global/styles/theme';
import { Header } from '../../components/Header';

export function EpisodeDetails() {
  const { primary } = theme.colors;
  const { getEpisodeById } = useTVMaze();
  const route = useRoute();
  const params = route.params as { id: number };

  const { image, name, summary, season, airdate, runtime, number } =
    useMemo(() => {
      return getEpisodeById(params?.id);
    }, [getEpisodeById, params]);

  return (
    <Background>
      <S.Container testID="episode-details">
        <Header title="Episode Details" />

        {image ? (
          <S.Image
            source={{
              uri: image.original,
            }}
            resizeMode="cover"
          />
        ) : (
          <S.Image source={IconPng} resizeMode="cover" testID="default-image" />
        )}

        <S.Content>
          <S.Title testID="episode-item-name">{name}</S.Title>

          <S.Information>
            <S.InfoGroup>
              <CalendarSvg />

              <S.InfoText>{airdate}</S.InfoText>
            </S.InfoGroup>

            <S.InfoGroup>
              <Feather name="clock" size={16} color={primary} />

              <S.InfoText>{runtime} min</S.InfoText>
            </S.InfoGroup>

            <S.InfoGroup>
              <Feather name="list" size={16} color={primary} />

              <S.InfoText>
                {number} / {season}
              </S.InfoText>
            </S.InfoGroup>
          </S.Information>

          <S.Summary>{summary}</S.Summary>
        </S.Content>
      </S.Container>
    </Background>
  );
}
