import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from '../views/Home';
import Saved from '../views/Saved';
import Settings from '../views/Settings';
import Feedback from '../views/Feedback';
import PrivacyPolicy from '../views/PrivacyPolicy';
import About from '../views/About';
import SearchView from '../views/SearchView';
import WordView from '../views/WordView';

const HomeNavigator = createStackNavigator({
  home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },
  saved: {
    screen: Saved,
    navigationOptions: {
      header: null
    }
  },
  settings: {
    screen: Settings,
    navigationOptions: {
      header: null
    }
  },
  feedback: {
    screen: Feedback,
    navigationOptions: {
      header: null
    }
  },
  privacyPolicy: {
    screen: PrivacyPolicy,
    navigationOptions: {
      header: null
    }
  },
  about: {
    screen: About,
    navigationOptions: {
      header: null
    }
  },
  search: {
    screen: SearchView,
    navigationOptions: {
      header: null
    }
  },
  wordView: {
    screen: WordView,
    navigationOptions: {
      header: null
    }
  }
});

export default createAppContainer(HomeNavigator);
