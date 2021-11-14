import React, { useCallback, useState } from 'react';
import { Modal } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { theme } from '../../global/styles/theme';

import * as S from './styles';
import { useTVMaze } from '../../hooks/useTVMaze';

export function Search() {
  const { setSearchShow, searchShow } = useTVMaze();
  const [modalVisible, setModalVisible] = useState(false);
  const [term, setTerm] = useState(searchShow);

  function handleShowModal() {
    setModalVisible(prevState => !prevState);
  }

  const handleSearch = useCallback(() => {
    setModalVisible(false);
    if (!term) {
      return;
    }
    setSearchShow(term);
  }, [term, setSearchShow]);

  return (
    <>
      <S.ButtonSearch onPress={handleShowModal}>
        <Feather name="search" size={24} color={theme.colors.primary} />
      </S.ButtonSearch>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <S.Container>
          <S.SearchBox>
            <S.Input
              value={term}
              onChangeText={setTerm}
              placeholder="Search a show"
              placeholderTextColor={theme.colors.secondary100}
              keyboardAppearance="dark"
              keyboardType="default"
              returnKeyLabel="Search"
              onSubmitEditing={handleSearch}
              autoFocus
            />
            <S.Button onPress={handleSearch}>
              <Feather
                name="search"
                size={24}
                color={theme.colors.secondary100}
              />
            </S.Button>
          </S.SearchBox>
        </S.Container>
      </Modal>
    </>
  );
}
