import React from 'react';
import { StatusBar } from 'react-native';
import { Header, Left, Right, Body, Title } from 'native-base';
import BackButton from './BackButton';
import {
  COLOR_BG_LIGHT,
  COLOR_BG_DARK,
  COLOR_TITLE_TEXT_DARK,
  COLOR_TITLE_TEXT_LIGHT,
  COLOR_BG_DARK_2
} from '../config/colors';
import { connect } from 'react-redux';

class CustomHeader extends React.PureComponent {
  render() {
    const { isDarkMode, title } = this.props;
    const bgColor = isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    const textColor = isDarkMode
      ? COLOR_TITLE_TEXT_DARK
      : COLOR_TITLE_TEXT_LIGHT;
    return (
      <Header style={{ backgroundColor: bgColor }}>
        <StatusBar
          backgroundColor={bgColor}
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        />
        <Left style={{ flex: 1 }}>
          <BackButton />
        </Left>
        <Body style={{ flex: 4 }}>
          <Title style={{ color: textColor }}>{title}</Title>
        </Body>
      </Header>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(CustomHeader);
