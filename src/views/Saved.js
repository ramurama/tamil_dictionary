import React from 'react';
import { View, FlatList } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';
import {
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_BG_DARK_2
} from '../config/colors';
import Header from '../components/Header';
import { STR_SAVED } from '../constants/strings';
import SavedItem from '../components/SavedItem';
import { VIEW_WORD_VIEW } from '../constants/viewNames';
import { mainWords } from './tempData';
import { removeElementInteger } from '../utils';

class Saved extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    const savedWords = mainWords.filter(wordItem =>
      this.props.saved.includes(wordItem.wordId)
    );
    return (
      <Container>
        <Header title={STR_SAVED} />
        <Content style={{ backgroundColor: bgColor }}>
          <FlatList
            data={savedWords}
            keyExtractor={({ item, index }) => index}
            renderItem={({ item }) => (
              <SavedItem
                wordId={item.wordId}
                image={item.image}
                tamilWord={item.tamilWord}
                engWord={item.engWord}
                onDelete={wordId => {
                  const { saved, setSaved } = this.props;
                  setSaved(removeElementInteger(saved, wordId));
                }}
                onPress={wordId => {
                  this.props.navigation.navigate(VIEW_WORD_VIEW, {
                    wordId
                  });
                }}
              />
            )}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode,
  saved: state.saved
});

export default connect(
  mapStateToProps,
  Actions
)(Saved);
