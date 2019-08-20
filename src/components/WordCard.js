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
  COLOR_SUBTITLE,
  COLOR_BG_DARK_2
} from '../config/colors';

const { height } = Dimensions.get('window');
const saveSolidLightEnabled = require('../../assets/images/save/save_solid_light_enabled.png');
const saveSolidDarkEnabled = require('../../assets/images/save/save_solid_dark_enabled.png');
const saveDisabled = require('../../assets/images/save/save_solid_dark.png');

class WordCard extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  _renderImageView() {
    return (
      <View style={{ flex: 1.5 }}>
        <Image
          source={this.props.image}
          style={{
            height: height * 0.15,
            width: height * 0.15,
            borderRadius: 10,
            position: 'absolute',
            top: -20,
            left: -20,
            elevation: 2
          }}
          resizeMode='cover'
        />
      </View>
    );
  }

  _renderSaveButton() {
    const { isDarkMode, isSaved, onSave, wordId } = this.props;
    return (
      <TouchableOpacity style={{ flex: 1 }} onPress={() => onSave(wordId)}>
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

  render() {
    const {
      isDarkMode,
      tamilWord,
      engWord,
      explanation,
      wordId,
      onPress
    } = this.props;
    const backgroundColor = isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    const backgroundColorOuter = isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    const textColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <View style={[styles.wrapper, { backgroundColor: backgroundColorOuter }]}>
        <TouchableWithoutFeedback onPress={() => onPress(wordId)}>
          <View style={[styles.mainView, { backgroundColor }]}>
            {this._renderImageView()}
            <View style={{ flex: 3.5, flexDirection: 'column' }}>
              <View style={styles.wordView}>
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
                <Text
                  style={{ color: COLOR_SUBTITLE }}
                >{`en. ${engWord}`}</Text>
              </View>
              <View style={{ flex: 2 }}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode='tail'
                  style={{ color: COLOR_SUBTITLE }}
                >
                  {explanation}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const mapStateTopProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateTopProps)(WordCard);

const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  mainView: {
    flexDirection: 'row',
    elevation: 4,
    shadowOffset: { height: 4, width: 4 },
    shadowOpacity: 0.8,
    shadowColor: 'lightgrey',
    borderRadius: 10,
    padding: 10,
    height: height * 0.15
  },
  wordView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
