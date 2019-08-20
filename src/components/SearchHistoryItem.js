import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import {
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT,
  COLOR_SUBTITLE
} from '../config/colors';

const histroyIcon = require('../../assets/images/history/history.png');
const closeIcon = require('../../assets/images/close/close.png');

class SearchHistoryItem extends React.PureComponent {
  _renderIconImage(image, disableTouch) {
    const { onDelete, wordId } = this.props;
    return (
      <TouchableOpacity
        style={styles.iconImageView}
        disabled={disableTouch}
        onPress={() => onDelete(wordId)}
      >
        <Image source={image} style={styles.iconImage} resizeMode='contain' />
      </TouchableOpacity>
    );
  }

  _renderWordView() {
    const { isDarkMode, tamilWord, engWord, wordId, onPress } = this.props;
    const tamilTextColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <TouchableWithoutFeedback onPress={() => onPress(wordId)}>
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
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        {this._renderIconImage(histroyIcon, true)}
        {this._renderWordView()}
        {this._renderIconImage(closeIcon, false)}
      </View>
    );
  }
}

const mapStateTopProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateTopProps)(SearchHistoryItem);

const styles = StyleSheet.create({
  iconImageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconImage: {
    height: 25,
    width: 25
  },
  wordView: {
    flex: 5,
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
