import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Right,
  Body,
  Input
} from 'native-base';
import { connect } from 'react-redux';
import {
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_DRAWER_TEXT_DARK,
  COLOR_DRAWER_TEXT_LIGHT,
  COLOR_PLACEHOLDER_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT
} from '../config/colors';
import BackButton from '../components/BackButton';
import { STR_SEARCH_AGARATHI } from '../constants/strings';
import SearchHistoryPanel from '../components/SearchHistoryPanel';
import { mainWords } from './tempData';
import { isNullOrEmpty } from '../utils';
import SearchListPanel from '../components/SearchListPanel';

const searchLight = require('../../assets/images/search/search_light.png');
const searchDark = require('../../assets/images/search/search_dark.png');

const { width } = Dimensions.get('window');

class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredWords: [],
      userTyping: false
    };
  }

  _filterWords(searchText) {
    let filteredWords = mainWords.filter(wordItem => {
      if (
        wordItem.tamilWord.includes(searchText) ||
        wordItem.engWord.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return wordItem;
      }
    });
    console.log(filteredWords);
    if (isNullOrEmpty(searchText)) {
      filteredWords = mainWords;
    }
    this.setState({ filteredWords: [...filteredWords] });
  }

  _renderHeader() {
    const { isDarkMode } = this.props;
    const bgColor = isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    const searchIcon = isDarkMode ? searchDark : searchLight;
    const textColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <Header style={{ backgroundColor: bgColor }} hasTabs>
        <StatusBar
          backgroundColor={bgColor}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <Left style={styles.headerLeft}>
          <BackButton />
        </Left>
        <Body style={styles.headerBody}>
          <Input
            placeholder={STR_SEARCH_AGARATHI}
            placeholderTextColor={COLOR_PLACEHOLDER_LIGHT}
            allowFontScaling={true}
            style={[
              styles.headerSearchInput,
              {
                color: textColor
              }
            ]}
            autoFocus={this.props.history.length === 0}
            onChangeText={value => {
              const { userTyping } = this.state;
              if (!userTyping) {
                this.setState({ userTyping: true }, () =>
                  this._filterWords(value)
                );
              } else if (value.length === 0) {
                this.setState({ userTyping: false }, () =>
                  this._filterWords(value)
                );
              } else {
                this._filterWords(value);
              }
            }}
          />
        </Body>
        <Right style={{ flex: 1 }}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={searchIcon}
              resizeMode='contain'
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
        </Right>
      </Header>
    );
  }

  render() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    const { userTyping } = this.state;
    return (
      <Container>
        {this._renderHeader()}
        <Content style={{ backgroundColor: bgColor }}>
          {!userTyping && <SearchHistoryPanel />}
          {userTyping && <SearchListPanel data={this.state.filteredWords} />}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode,
  history: state.history
});

export default connect(mapStateToProps)(SearchView);

const styles = StyleSheet.create({
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  headerBody: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerSearchInput: {
    flex: 1,
    borderWidth: 0,
    width: width * 0.7,
    fontSize: 22
  }
});
