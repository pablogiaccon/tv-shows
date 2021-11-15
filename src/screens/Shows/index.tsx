import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useTVMaze } from '../../hooks/useTVMaze';

import { Background } from '../../components/Background';
import { ListDivider } from '../../components/ListDivider';
import { ShowItem } from '../../components/ShowItem';
import { Header } from '../../components/Header';
import { Search } from '../../components/Search';

import * as S from './styles';
import { theme } from '../../global/styles/theme';

export function Shows() {
  const { shows, loadShows, searchShow, setSearchShow } = useTVMaze();

  useEffect(() => {
    loadShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCleanSearch() {
    setSearchShow('');
  }
  return (
    <Background>
      <Header title="Shows" action={<Search />} />
      <S.Container testID="shows-page">
        <S.Header>
          {!!searchShow && (
            <S.Search onPress={handleCleanSearch} testID="search">
              <S.SearchText>Search: {searchShow}</S.SearchText>

              <Feather name="x-circle" size={18} color={theme.colors.primary} />
            </S.Search>
          )}
          <S.Total>Total {shows?.length}</S.Total>
        </S.Header>

        <FlatList
          data={shows}
          keyExtractor={(item, index) => `${String(item.id)}-${index}`}
          renderItem={({ item }) => <ShowItem show={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ListDivider />}
        />
      </S.Container>
    </Background>
  );
}
