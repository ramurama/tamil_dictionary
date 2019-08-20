import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { connect } from 'react-redux';
import {
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT,
  COLOR_SUBTITLE
} from '../config/colors';

const { height, width } = Dimensions.get('window');

const saveSolidLightEnabled = require('../../assets/images/save/save_solid_light_enabled.png');
const saveSolidDarkEnabled = require('../../assets/images/save/save_solid_dark_enabled.png');
const saveDisabled = require('../../assets/images/save/save_solid_dark.png');

class WordForTheDay extends React.PureComponent {
  _renderSaveButton() {
    const { isDarkMode, isSaved, onSave, wordId } = this.props;
    return (
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => onSave(wordId)}
      >
        <Image
          source={
            isSaved
              ? isDarkMode
                ? saveSolidDarkEnabled
                : saveSolidLightEnabled
              : saveDisabled
          }
          resizeMode='contain'
          style={{ height: 25, width: 25 }}
        />
      </TouchableOpacity>
    );
  }

  _renderImageView() {
    return (
      <View style={{ flex: 3, borderRadius: 10 }}>
        <Image
          style={{ flex: 1, width: width - 20, borderRadius: 10 }}
          source={this.props.image}
          resizeMode='cover'
        />
      </View>
    );
  }

  render() {
    const {
      isDarkMode,
      tamilWord,
      engWord,
      explanation,
      onPress,
      wordId
    } = this.props;
    const backgroundColor = isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    const textColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <TouchableWithoutFeedback onPress={() => onPress(wordId)}>
        <View style={[styles.mainView]}>
          {this._renderImageView()}
          <View style={[styles.wordView, { backgroundColor }]}>
            <View style={styles.tamilWordView}>
              <View style={{ flex: 7 }}>
                <Text style={{ color: textColor, fontSize: 20 }}>
                  {tamilWord}
                </Text>
              </View>
              {this._renderSaveButton()}
            </View>
            <View
              style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
            >
              <Text style={{ color: COLOR_SUBTITLE }}>{`en. ${engWord}`}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={{ color: COLOR_SUBTITLE }}
              >
                {explanation}
              </Text>
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

export default connect(mapStateToProps)(WordForTheDay);

const styles = StyleSheet.create({
  mainView: {
    height: height * 0.35,
    flexDirection: 'column',
    borderRadius: 10,
    width: width - 20,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10
  },
  wordView: {
    flex: 2,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    marginTop: -20,
    elevation: 3,
    shadowOffset: { height: 3, width: 3 },
    shadowOpacity: 0.8,
    shadowColor: 'lightgrey'
  },
  tamilWordView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
