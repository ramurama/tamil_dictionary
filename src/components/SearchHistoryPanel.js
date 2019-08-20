import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import SearchHistoryItem from './SearchHistoryItem';
import { COLOR_TEXT_GREY } from '../config/colors';
import { VIEW_WORD_VIEW } from '../constants/viewNames';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';
import { mainWords } from '../views/tempData';
import { isEqual, removeElementInteger } from '../utils';

class SearchHistoryPanel extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { history } = this.props;
    const historyWords = [];
    for (let i = 0; i < history.length; i++) {
      historyWords.push(
        mainWords.filter(wordItem => isEqual(wordItem.wordId, history[i]))[0]
      );
    }

    return (
      <View style={{ flexDirection: 'column' }}>
        <FlatList
          data={historyWords.reverse()}
          keyExtractor={({ item, index }) => index}
          extraData={this.props.history}
          renderItem={({ item }) => (
            <SearchHistoryItem
              image={item.image}
              tamilWord={item.tamilWord}
              engWord={item.engWord}
              wordId={item.wordId}
              onPress={wordId => {
                this.props.navigation.navigate(VIEW_WORD_VIEW, {
                  wordId
                });
              }}
              onDelete={wordId => {
                this.props.setTempHistory(
                  removeElementInteger(this.props.history, wordId)
                );
              }}
            />
          )}
        />
        {history.length > 0 && (
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => this.props.setTempHistory([])}
          >
            <Text style={styles.clearAllText}>Clear all</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  history: state.history
});

export default connect(
  mapStateToProps,
  Actions
)(withNavigation(SearchHistoryPanel));

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  clearAllText: {
    borderBottomWidth: 1,
    marginRight: 10,
    color: COLOR_TEXT_GREY,
    borderBottomColor: COLOR_TEXT_GREY
  }
});
