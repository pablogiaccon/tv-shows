import React from 'react';
import { FlatList } from 'react-native';

import { useTVMaze } from '../../hooks/useTVMaze';
import { EpisodeItem } from '../EpisodeItem';
import { ListDivider } from '../ListDivider';

import * as S from './styles';

export function EpisodesList() {
  const { episodes } = useTVMaze();

  return (
    <S.Container testID="episode-list">
      <S.Header>
        <S.Title>Episodes</S.Title>
        <S.Total>Total {episodes?.length}</S.Total>
      </S.Header>

      <FlatList
        data={episodes}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <EpisodeItem episode={item} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider />}
      />
    </S.Container>
  );
}
