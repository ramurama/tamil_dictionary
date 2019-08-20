import React from 'react';
import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import { Container, Content, Tab, Tabs } from 'native-base';
import { connect } from 'react-redux';
import {
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_DRAWER_TEXT_LIGHT,
  COLOR_DRAWER_TEXT_DARK,
  COLOR_WORD_ACTION_BG_LIGHT,
  COLOR_BG_DARK_2,
  COLOR_TEXT_LIGHT,
  COLOR_PLACEHOLDER_LIGHT,
  COLOR_WORD_ACTION_BG_DARK,
  COLOR_THEME_LIGHT,
  COLOR_TEXT_GREY,
  COLOR_TEXT_DARK,
  COLOR_THEME_DARK
} from '../config/colors';
import BackButton from '../components/BackButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { isEqual, isNullOrEmpty } from '../utils';
import {
  TAMIL_EXPLANATION,
  TAMIL_LEARNING,
  TAMIL_ETYMOLOGY
} from '../constants/strings';
import OrderedList from '../components/OrderedList';
import WordImageModal from '../components/WordImageModal';
import SoundPlayer from 'react-native-sound-player';
import * as Actions from '../redux/actions';
import { removeElementInteger } from '../utils';
import _ from 'underscore';

const { height, width } = Dimensions.get('window');

const assets = {
  speaker: require('../../assets/images/speaker/speaker_action.png'),
  copy: require('../../assets/images/copy/copy_action.png'),
  saveDisabled: require('../../assets/images/save/save_action_disabled.png'),
  saveEnabledDark: require('../../assets/images/save/save_solid_dark_enabled.png'),
  saveEnabledLight: require('../../assets/images/save/save_solid_light_enabled.png'),
  share: require('../../assets/images/share/share_action.png')
};

class WordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: null,
      isImageModelOpen: false,
      isSaved: false
    };
  }

  componentDidMount() {
    const { navigation, tempWords, saved, setTempHistory } = this.props;
    const wordId = navigation.getParam('wordId');
    // const word = tempWords.filter(wordItem =>
    //   isEqual(wordId, wordItem.wordId)
    // )[0];
    const word = _.find(tempWords, { wordId });
    let isSaved = false;
    //check if this word is saved
    if (saved.includes(wordId)) {
      isSaved = true;
    }
    this.setState({ word, isSaved }, () => {
      setTimeout(() => {
        // this._loadSound(word.audioUri);
        setTempHistory([
          ...removeElementInteger(this.props.history, wordId),
          wordId
        ]);
      }, 0);
    });
  }

  _loadSound(uri) {
    try {
      SoundPlayer.loadUrl(uri);
    } catch (err) {
      console.log(err);
    }
  }

  _renderImageView() {
    return (
      <TouchableWithoutFeedback
        style={{ flex: 1, height: height * 0.35 }}
        onPress={() => this.setState({ isImageModelOpen: true })}
      >
        <ImageBackground
          source={this.state.word.image}
          style={{ height: height * 0.35 }}
          resizeMode='cover'
        >
          <BackButton
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              marginLeft: 10,
              marginTop: 15,
              height: 30,
              width: 30
            }}
            disableColor={true}
          />
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }

  _withCard(children, isFreeHeight) {
    const cardBgColor = this.props.isDarkMode ? COLOR_BG_DARK : '#FFFFFF';
    const styleHeight = isFreeHeight ? { flex: 1 } : { height: height * 0.33 };
    return (
      <View
        style={[styles.card, styleHeight, { backgroundColor: cardBgColor }]}
      >
        {children}
      </View>
    );
  }

  _renderActionButton(image, onPress) {
    const { isDarkMode } = this.props;
    const bgColor = isDarkMode
      ? COLOR_WORD_ACTION_BG_DARK
      : COLOR_WORD_ACTION_BG_LIGHT;
    let imageSrc = assets[image];
    if (isEqual(image, 'saveEnabled')) {
      imageSrc = isDarkMode
        ? assets['saveEnabledDark']
        : assets['saveEnabledLight'];
    }
    return (
      <TouchableOpacity
        style={{ padding: 15, backgroundColor: bgColor, borderRadius: 10 }}
        onPress={() => onPress()}
      >
        <Image
          source={imageSrc}
          style={{ height: 25, width: 25 }}
          resizeMode='contain'
        />
      </TouchableOpacity>
    );
  }

  _toggleSaveWord = () => {
    this.setState({ isSaved: !this.state.isSaved }, () => {
      const { saved, setSaved, navigation } = this.props;
      const wordId = navigation.getParam('wordId');
      if (this.state.isSaved) {
        // add to saved state
        setSaved([...saved, wordId]);
      } else {
        // remove from saved state
        setSaved(removeElementInteger(saved, wordId));
      }
    });
  };

  _renderWordView() {
    const { isDarkMode } = this.props;
    const { word } = this.state;
    const textColor = isDarkMode ? COLOR_DRAWER_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <View style={styles.wordView}>
        <View style={styles.wordRow}>
          <Text style={[styles.tamilWordText, { color: textColor }]}>
            {word.tamilWord}
          </Text>
        </View>
        <View style={styles.wordRow}>
          <Text style={styles.subTextColor}>{word.pronounceText}</Text>
        </View>
        <View style={styles.wordRow}>
          <Text style={styles.subTextColor}>{`en. ${word.engWord}`}</Text>
        </View>
        {this.props.phoneoticsStatus && (
          <View style={styles.wordRow}>
            <Text style={styles.subTextColor}>{`phn. ${word.phonetics}`}</Text>
          </View>
        )}
        <View
          style={[styles.wordRow, { flex: 2, justifyContent: 'space-evenly' }]}
        >
          {this._renderActionButton('speaker', () => {
            try {
              SoundPlayer.play();
            } catch (err) {
              console.log(err);
            }
          })}
          {this._renderActionButton('copy', () => {})}
          {this.state.isSaved &&
            this._renderActionButton('saveEnabled', this._toggleSaveWord)}
          {!this.state.isSaved &&
            this._renderActionButton('saveDisabled', this._toggleSaveWord)}
          {this._renderActionButton('share', () => {})}
        </View>
      </View>
    );
  }

  _withTab(title, content) {
    const { isDarkMode } = this.props;
    const color = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    const bgColor = isDarkMode ? COLOR_BG_DARK : COLOR_THEME_DARK;
    const tabStyle = { backgroundColor: bgColor };
    const tabTextStyle = {
      // fontFamily: 'MuktaMalar-Regular',
      color: COLOR_PLACEHOLDER_LIGHT,
      fontSize: 15
    };
    const activeTabTextStyle = {
      // fontFamily: 'MuktaMalar-Regular',
      color,
      fontSize: 15
    };
    return (
      <Tab
        heading={title}
        tabStyle={tabStyle}
        activeTabStyle={tabStyle}
        textStyle={tabTextStyle}
        activeTextStyle={activeTabTextStyle}
      >
        {content}
      </Tab>
    );
  }

  _renderLayerView() {
    const backgroundColor = this.props.isDarkMode
      ? COLOR_BG_LIGHT
      : COLOR_THEME_LIGHT;
    const { word } = this.state;
    return (
      <Tabs
        tabContainerStyle={styles.tabsContainer}
        tabBarUnderlineStyle={[styles.tabsUnderLine, { backgroundColor }]}
      >
        {this._withTab(
          TAMIL_EXPLANATION,
          <OrderedList items={word.explanation} />
        )}
        {this._withTab(TAMIL_LEARNING, <OrderedList items={word.learning} />)}
        {this._withTab(TAMIL_ETYMOLOGY, <OrderedList items={word.origin} />)}
      </Tabs>
    );
  }

  render() {
    const { isDarkMode } = this.props;
    const { word, isImageModelOpen } = this.state;
    const bgColor = isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    return (
      <Container>
        <Content style={{ backgroundColor: bgColor }}>
          {!isNullOrEmpty(word) && this._renderImageView()}
          {!isNullOrEmpty(word) &&
            this._withCard(this._renderWordView(), false)}
          {!isNullOrEmpty(word) &&
            this._withCard(this._renderLayerView(), true)}
        </Content>
        {!isNullOrEmpty(word) && (
          <WordImageModal
            visible={isImageModelOpen}
            onBackPress={() => this.setState({ isImageModelOpen: false })}
            image={this.state.word.image}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode,
  history: state.history,
  phoneoticsStatus: state.phoneoticsStatus,
  saved: state.saved,
  tempWords: state.tempWords
});

export default connect(
  mapStateToProps,
  Actions
)(WordView);

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    marginTop: -10,
    marginBottom: 20,
    // elevation: 3,
    // shadowOffset: { height: 1, width: 1 },
    // shadowOpacity: 0.8,
    // shadowColor: 'lightgrey',
    paddingBottom: 10
  },
  wordView: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 10,
    marginBottom: 10
  },
  wordRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subTextColor: { fontSize: 17, color: COLOR_PLACEHOLDER_LIGHT },
  tamilWordText: { fontSize: 28 },

  tabsContainer: {
    elevation: 0,
    marginTop: 10,
    marginBottom: 10,
    height: 30
  },
  tabsUnderLine: {
    width: 50,
    marginLeft: 35,
    borderRadius: 2,
    height: 4
  }
});
