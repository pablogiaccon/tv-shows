import React, { useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';

import CalendarSvg from '../../assets/calendar.svg';

import { useTVMaze } from '../../hooks/useTVMaze';
import { theme } from '../../global/styles/theme';

import { EpisodesList } from '../../components/EpisodesList';
import { Background } from '../../components/Background';
import { SeasonSelect } from '../../components/SeasonSelect';

import * as S from './styles';

export function ShowInformation() {
  const { primary } = theme.colors;
  const { show, loadShowInformation } = useTVMaze();

  useEffect(() => {
    loadShowInformation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!show) {
    <AppLoading />;
  }

  return (
    <Background>
      <S.Container testID="show-information">
        <S.InformationContainer>
          <S.Image
            source={{ uri: show?.image.original }}
            resizeMode="contain"
          />

          <S.Information>
            <S.Title testID="show-name">{show?.name}</S.Title>

            <S.Summary showsVerticalScrollIndicator>
              <S.SummaryText>{show?.summary}</S.SummaryText>
            </S.Summary>
          </S.Information>
        </S.InformationContainer>

        <S.InformationContainer>
          <S.TextContainer>
            <CalendarSvg />
            <S.Text>
              {show?.premiered} - {show?.ended}
            </S.Text>
          </S.TextContainer>

          <S.TextContainer>
            <Feather name="star" color={primary} size={16} />

            <S.Text>{show?.rating.average}</S.Text>
          </S.TextContainer>
        </S.InformationContainer>

        <S.InformationContainer>
          <S.TextContainer>
            <Feather name="user" color={primary} size={16} />

            <S.Text>{show?.genres}</S.Text>
          </S.TextContainer>

          <S.TextContainer>
            <Feather name="globe" color={primary} size={16} />
            <S.Text>{show?.language}</S.Text>
          </S.TextContainer>
        </S.InformationContainer>

        <SeasonSelect />

        <EpisodesList />
      </S.Container>
    </Background>
  );
}
