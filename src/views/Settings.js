import React from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import { Container, Content, Footer, FooterTab } from 'native-base';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';
import {
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_TEXT_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_BG_DARK_3,
  COLOR_THEME_LIGHT,
  COLOR_BG_DARK_2
} from '../config/colors';
import Header from '../components/Header';
import {
  STR_SETTINGS,
  STR_NOTIFICATIONS,
  STR_PHONEOTICS
} from '../constants/strings';
import SettingItem from '../components/SettingsItem';

const SCREEN_W = Dimensions.get('window').width;

const LIGHT_ASSETS = {
  notification: require('../../assets/images/notification/notification_light.png'),
  phoneotics: require('../../assets/images/phoneotics/phoneotics_light.png')
};

const DARK_ASSETS = {
  notification: require('../../assets/images/notification/notification_dark.png'),
  phoneotics: require('../../assets/images/phoneotics/phoneotics_dark.png')
};

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsToggle: true,
      phoneoticsToggle: true
    };
  }

  _getImage(image) {
    return this.props.isDarkMode ? DARK_ASSETS[image] : LIGHT_ASSETS[image];
  }

  _renderSignOutButton() {
    const { isDarkMode } = this.props;
    const buttonBg = isDarkMode ? COLOR_BG_DARK_3 : COLOR_THEME_LIGHT;
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    return (
      <Footer style={{ paddingBottom: 40, backgroundColor: bgColor }}>
        <FooterTab style={{ backgroundColor: bgColor }}>
          <View style={[styles.signOutButtonView]}>
            <TouchableOpacity
              style={[styles.signOutTouchable, { backgroundColor: buttonBg }]}
              onPress={() => {}}
            >
              <Text style={[styles.signOutText, { color: COLOR_TEXT_DARK }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
          </View>
        </FooterTab>
      </Footer>
    );
  }

  render() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    return (
      <Container>
        <Header title={STR_SETTINGS} />
        <Content style={{ backgroundColor: bgColor }}>
          <SettingItem
            leftIcon={true}
            icon={this._getImage('notification')}
            title={STR_NOTIFICATIONS}
            navigation={false}
            toggle={true}
            enableTouch={false}
            onTogglePress={toggleValue => {
              this.setState({ notificationsToggle: toggleValue });
            }}
            toggleStatus={this.state.notificationsToggle}
          />
          <SettingItem
            leftIcon={true}
            icon={this._getImage('phoneotics')}
            title={STR_PHONEOTICS}
            navigation={false}
            toggle={true}
            enableTouch={false}
            onTogglePress={toggleValue => {
              this.setState({ phoneoticsToggle: toggleValue }, () =>
                this.props.setPhoneoticsStatus(toggleValue)
              );
            }}
            toggleStatus={this.props.phoneoticsStatus}
          />
        </Content>
        {/* {this._renderSignOutButton()} */}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode,
  phoneoticsStatus: state.phoneoticsStatus
});

export default connect(
  mapStateToProps,
  Actions
)(Settings);

const styles = StyleSheet.create({
  signOutText: {
    // fontFamily: 'Questrial',
    fontSize: 20,
    alignSelf: 'center'
  },
  signOutTouchable: {
    flex: 1,
    margin: 10,
    marginTop: 0,
    padding: 15,
    borderRadius: 5
    // elevation: 2,
    // shadowOffset: { height: 2, width: 2 },
    // shadowOpacity: 0.8,
    // shadowColor: 'lightgrey'
  },
  signOutButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_W
  }
});
