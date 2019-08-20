import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar
} from 'react-native';
import {
  Container,
  Content,
  Header,
  Body,
  Left,
  Right,
  Tabs,
  Tab
} from 'native-base';
import {
  COLOR_BG_LIGHT,
  COLOR_BG_DARK,
  COLOR_PLACEHOLDER_LIGHT,
  COLOR_BG_DARK_2,
  COLOR_THEME_LIGHT,
  COLOR_TEXT_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_SUBTITLE
} from '../config/colors';
import { connect } from 'react-redux';
import { VIEW_SEARCH, VIEW_WORD_VIEW } from '../constants/viewNames';
import { STR_SEARCH_AGARATHI } from '../constants/strings';
import WordCard from '../components/WordCard';
import { FlatList } from 'react-native-gesture-handler';
import WordForTheDay from '../components/WordForTheDay';
import CarouselPagination from '../components/CarouselPagination';
import { isEqual, removeElementInteger } from '../utils';
import { mainWords, wordOfTheDay } from './tempData';
import * as Actions from '../redux/actions';
import moment from 'moment';

const { width } = Dimensions.get('window');

const burgerLight = require('../../assets/images/burger/burger_light.png');
const burgerDark = require('../../assets/images/burger/burger_dark.png');
const searchLight = require('../../assets/images/search/search_light.png');
const searchDark = require('../../assets/images/search/search_dark.png');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWordForTheDayIndex: 0,
      wordOfTheDay: []
    };
  }

  componentDidMount() {
    this.props.setTempWords(mainWords);
    /*   
        ! temp dates computation for word of the day 
      */
    const dates = [];
    const today = moment();
    dates.push(today.format('DD MMM'));
    for (let i = 1; i <= 5; i++) {
      dates.push(today.subtract(1, 'days').format('DD MMM'));
    }
    for (let i = 0; i < 6; i++) {
      const word = mainWords[i];
      word['date'] = dates[i];
    }
    // temp dates computation for word of the day ends

    this.setState({
      wordOfTheDay: mainWords
        .map(wordItem => {
          const {
            wordId,
            tamilWord,
            engWord,
            image,
            explanation,
            date
          } = wordItem;
          return {
            wordId,
            tamilWord,
            engWord,
            image,
            explanation,
            date
          };
        })
        .filter(wordItem => wordOfTheDay.includes(wordItem.wordId))
    });
  }

  _renderHeader() {
    const { isDarkMode } = this.props;
    const bgColor = isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    const burgerMenu = isDarkMode ? burgerDark : burgerLight;
    const searchIcon = isDarkMode ? searchDark : searchLight;
    return (
      <Header style={{ backgroundColor: bgColor }} hasTabs>
        <StatusBar
          backgroundColor={bgColor}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <Left style={styles.headerLeft}>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Image
              source={burgerMenu}
              resizeMode='contain'
              style={{ height: 25, width: 25 }}
            />
          </TouchableOpacity>
        </Left>
        <Body style={styles.headerBody}>
          <TouchableWithoutFeedback
            onPress={() => this.props.navigation.navigate(VIEW_SEARCH)}
          >
            <Text style={{ color: COLOR_PLACEHOLDER_LIGHT, fontSize: 25 }}>
              {STR_SEARCH_AGARATHI}
            </Text>
          </TouchableWithoutFeedback>
        </Body>
        <Right style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(VIEW_SEARCH)}
          >
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

  _withTab(title, content) {
    const { isDarkMode } = this.props;
    const color = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    const bgColor = isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    const tabStyle = { backgroundColor: bgColor };
    const tabTextStyle = {
      // fontFamily: 'MuktaMalar-Regular',
      color: COLOR_PLACEHOLDER_LIGHT,
      fontSize: 18
    };
    const activeTabTextStyle = {
      // fontFamily: 'MuktaMalar-Regular',
      color,
      fontSize: 20,
      fontWeight: '900'
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

  _toggleSave = wordId => {
    const { saved, setSaved } = this.props;
    //check if word exists in saved state
    const isSaved = saved.includes(wordId);
    if (isSaved) {
      setSaved(removeElementInteger(saved, wordId));
    } else {
      setSaved([...saved, wordId]);
    }
  };

  _renderWordCard(item) {
    const { saved, setSaved } = this.props;
    return (
      <WordCard
        isSaved={saved.includes(item.wordId)}
        onSave={this._toggleSave}
        wordId={item.wordId}
        tamilWord={item.tamilWord}
        engWord={item.engWord}
        explanation={item.explanation}
        image={item.image}
        onPress={wordId =>
          this.props.navigation.navigate(VIEW_WORD_VIEW, {
            wordId
          })
        }
      />
    );
  }

  _renderWordCardList(list) {
    const { isDarkMode } = this.props;
    const backgroundColor = isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    return (
      <View style={{ flex: 1, backgroundColor, paddingTop: 10 }}>
        <FlatList
          data={list}
          renderItem={({ item }) => this._renderWordCard(item)}
          keyExtractor={({ item, index }) => index}
          ListEmptyComponent={
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT
                }}
              >
                No items to show
              </Text>
            </View>
          }
        />
      </View>
    );
  }

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    const currentWordForTheDayIndex = viewableItems[0].index;
    console.log(viewableItems);
    console.log(changed);
    this.setState({ currentWordForTheDayIndex });
  };

  _renderPagination() {
    const { currentWordForTheDayIndex } = this.state;
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <View style={{ flex: 3 }} />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-evenly'
          }}
        >
          <CarouselPagination
            selected={isEqual(currentWordForTheDayIndex, 0)}
          />
          <CarouselPagination
            selected={isEqual(currentWordForTheDayIndex, 1)}
          />
          <CarouselPagination
            selected={isEqual(currentWordForTheDayIndex, 2)}
          />
          <CarouselPagination
            selected={isEqual(currentWordForTheDayIndex, 3)}
          />
          <CarouselPagination
            selected={isEqual(currentWordForTheDayIndex, 4)}
          />
        </View>
        <View style={{ flex: 3 }} />
      </View>
    );
  }

  _renderWordForTheDay() {
    const { currentWordForTheDayIndex } = this.state;
    const textColor = this.props.isDarkMode
      ? COLOR_TEXT_DARK
      : COLOR_TEXT_LIGHT;
    return (
      <View>
        <View style={styles.wordOfDayHeader}>
          <View style={styles.wordOfDayTitleView}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: textColor }}>
              Word of the day
            </Text>
          </View>
          <View style={styles.wordOfDayDateView}>
            <Text style={{ color: COLOR_SUBTITLE }}>
              {this.state.wordOfTheDay[currentWordForTheDayIndex].date}
            </Text>
          </View>
        </View>
        <FlatList
          data={this.state.wordOfTheDay}
          horizontal
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={this._onViewableItemsChanged}
          pagingEnabled
          renderItem={({ item }) => (
            <WordForTheDay
              tamilWord={item.tamilWord}
              engWord={item.engWord}
              wordId={item.wordId}
              explanation={item.explanation}
              image={item.image}
              isSaved={this.props.saved.includes(item.wordId)}
              onPress={wordId =>
                this.props.navigation.navigate(VIEW_WORD_VIEW, {
                  wordId
                })
              }
              onSave={this._toggleSave}
            />
          )}
        />
        {this._renderPagination()}
      </View>
    );
  }

  _renderFeatured() {
    const backgroundColor = this.props.isDarkMode
      ? COLOR_BG_LIGHT
      : COLOR_THEME_LIGHT;

    const { history } = this.props;
    const historyWords = [];
    for (let i = 0; i < history.length; i++) {
      historyWords.push(
        mainWords.filter(wordItem => isEqual(wordItem.wordId, history[i]))[0]
      );
    }

    return (
      <Tabs
        tabContainerStyle={styles.tabsContainer}
        tabBarUnderlineStyle={[styles.tabsUnderLine, { backgroundColor }]}
      >
        {this._withTab(
          'Featured',
          this._renderWordCardList(this.props.tempWords)
        )}
        {this._withTab(
          'Recent',
          this._renderWordCardList(historyWords.reverse())
        )}
      </Tabs>
    );
  }

  render() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    return (
      <Container>
        {this._renderHeader()}
        <Content style={{ backgroundColor: bgColor }}>
          {this.state.wordOfTheDay.length > 0 && this._renderWordForTheDay()}
          {this.props.tempWords.length > 0 && this._renderFeatured()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode,
  tempWords: state.tempWords,
  history: state.history,
  saved: state.saved
});

export default connect(
  mapStateToProps,
  Actions
)(Home);

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
  tabsContainer: {
    elevation: 0,
    marginTop: 10,
    marginBottom: 10,
    height: 30
  },
  tabsUnderLine: {
    width: 50,
    marginLeft: width * 0.5 * 0.36,
    borderRadius: 2,
    height: 4
  },
  wordOfDayHeader: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row'
  },
  wordOfDayTitleView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  wordOfDayDateView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});
