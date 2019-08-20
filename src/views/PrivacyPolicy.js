import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import {
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_DRAWER_TEXT_LIGHT,
  COLOR_DRAWER_TEXT_DARK
} from '../config/colors';
import Header from '../components/Header';
import { STR_PRIVACY_POLICY } from '../constants/strings';

class PrivacyPolicy extends React.Component {
  render() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    const textColor = this.props.isDarkMode
      ? COLOR_DRAWER_TEXT_DARK
      : COLOR_DRAWER_TEXT_LIGHT;
    return (
      <Container>
        <Header title={STR_PRIVACY_POLICY} />
        <Content style={{ backgroundColor: bgColor }}>
          <Text style={{ color: textColor, alignSelf: 'center' }}>
            Work in progress
          </Text>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(PrivacyPolicy);
