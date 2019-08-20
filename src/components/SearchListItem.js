import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import {
  COLOR_SUBTITLE,
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT
} from '../config/colors';

class SearchListItem extends React.PureComponent {
  render() {
    const { isDarkMode, tamilWord, engWord, wordId, onPress } = this.props;
    const tamilTextColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <TouchableWithoutFeedback onPress={() => onPress(wordId)}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <View style={styles.wordView}>
            <View style={styles.tamilWord}>
              <Text style={[styles.tamilWordText, { color: tamilTextColor }]}>
                {tamilWord}
              </Text>
            </View>
            <View style={styles.engWordView}>
              <Text style={styles.engWordText}>{`en. ${engWord}`}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(SearchListItem);

const styles = StyleSheet.create({
  wordView: {
    flex: 6,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  tamilWord: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  tamilWordText: {
    fontSize: 18
  },
  engWordView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  engWordText: {
    color: COLOR_SUBTITLE
  }
});
