import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native';
import { Container, Content, Icon, Footer, FooterTab } from 'native-base';
import {
  VIEW_SAVED,
  VIEW_SETTINGS,
  VIEW_FEEDBACK,
  VIEW_PRIVACY_POLICY,
  VIEW_ABOUT
} from '../constants/viewNames';
import {
  COLOR_BG_LIGHT,
  COLOR_SEPERATOR_LIGHT,
  COLOR_DRAWER_TEXT_LIGHT,
  COLOR_DRAWER_TEXT_DARK,
  COLOR_BG_DARK
} from '../config/colors';
import DrawerItem from '../components/DrawerItem';
import { connect } from 'react-redux';
import * as Actions from '../redux/actions';
import {
  STR_SAVED,
  STR_SETTINGS,
  STR_SHARE,
  STR_RATEUS,
  STR_FEEDBACK,
  STR_PRIVACY_POLICY,
  STR_ABOUT
} from '../constants/strings';

const { height } = Dimensions.get('window');

const LIGHT_ASSETS = {
  darkMode: require('../../assets/images/darkmode/darkmode_light.png'),
  save: require('../../assets/images/save/save_stroke_light.png'),
  settings: require('../../assets/images/settings/settings_light.png'),
  share: require('../../assets/images/share/share_light.png'),
  rateus: require('../../assets/images/rateus/rateus_light.png'),
  feedback: require('../../assets/images/feedback/feedback_light.png'),
  privacyPolicy: require('../../assets/images/privacy_policy/privacy_policy_light.png'),
  about: require('../../assets/images/about/about_light.png'),
  user: require('../../assets/images/user/user_light.png')
};

const DARK_ASSETS = {
  darkMode: require('../../assets/images/darkmode/darkmode_dark.png'),
  save: require('../../assets/images/save/save_stroke_dark.png'),
  settings: require('../../assets/images/settings/settings_dark.png'),
  share: require('../../assets/images/share/share_dark.png'),
  rateus: require('../../assets/images/rateus/rateus_dark.png'),
  feedback: require('../../assets/images/feedback/feedback_dark.png'),
  privacyPolicy: require('../../assets/images/privacy_policy/privacy_policy_dark.png'),
  about: require('../../assets/images/about/about_dark.png'),
  user: require('../../assets/images/user/user_dark.png')
};

class Drawer extends React.Component {
  _getImage(image) {
    return this.props.isDarkMode ? DARK_ASSETS[image] : LIGHT_ASSETS[image];
  }

  _renderProfileContent() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    const textColor = this.props.isDarkMode
      ? COLOR_DRAWER_TEXT_DARK
      : COLOR_DRAWER_TEXT_LIGHT;
    return (
      <View style={styles.profileContentView}>
        <View style={styles.profileImageOuterView}>
          <View
            style={[
              styles.profileImageInnerView,
              {
                backgroundColor: bgColor
              }
            ]}
          >
            <Image
              source={this._getImage('user')}
              style={styles.profileImage}
              resizeMode='contain'
            />
          </View>
        </View>
        <View style={styles.drawerTitleView}>
          <Text style={[styles.drawerTitleText, { color: textColor }]}>
            User Profile
          </Text>
        </View>
      </View>
    );
  }

  _renderSeperator() {
    return <View style={styles.seperator} />;
  }

  _renderFooter() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    return (
      <Footer
        style={[
          styles.footer,
          {
            backgroundColor: bgColor
          }
        ]}
      >
        <FooterTab style={{ backgroundColor: bgColor }}>
          <TouchableOpacity
            style={styles.footerTouchable}
            onPress={() => this.props.setDarkMode(!this.props.isDarkMode)}
          >
            <Image
              source={this._getImage('darkMode')}
              style={{ height: 65, width: 65 }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        </FooterTab>
      </Footer>
    );
  }

  render() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    return (
      <Container>
        <Content padder style={{ backgroundColor: bgColor }}>
          {this._renderProfileContent()}
          {this._renderSeperator()}
          <DrawerItem
            image={this._getImage('save')}
            title={STR_SAVED}
            onPress={() => this.props.navigation.navigate(VIEW_SAVED)}
          />
          <DrawerItem
            image={this._getImage('settings')}
            title={STR_SETTINGS}
            onPress={() => this.props.navigation.navigate(VIEW_SETTINGS)}
          />
          {this._renderSeperator()}
          <DrawerItem
            image={this._getImage('share')}
            title={STR_SHARE}
            onPress={() => {}}
          />
          <DrawerItem
            image={this._getImage('rateus')}
            title={STR_RATEUS}
            onPress={() => {}}
          />
          <DrawerItem
            image={this._getImage('feedback')}
            title={STR_FEEDBACK}
            onPress={() => this.props.navigation.navigate(VIEW_FEEDBACK)}
          />
          <DrawerItem
            image={this._getImage('privacyPolicy')}
            title={STR_PRIVACY_POLICY}
            onPress={() => this.props.navigation.navigate(VIEW_PRIVACY_POLICY)}
          />
          <DrawerItem
            image={this._getImage('about')}
            title={STR_ABOUT}
            onPress={() => this.props.navigation.navigate(VIEW_ABOUT)}
          />
        </Content>
        {this._renderFooter()}
      </Container>
    );
  }
}

const mapStateTopProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(
  mapStateTopProps,
  Actions
)(Drawer);

const styles = StyleSheet.create({
  profileContentView: {
    height: height * 0.3,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  profileImageOuterView: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  profileImageInnerView: {
    borderRadius: 99,
    elevation: 4,
    shadowColor: 'lightgrey',
    shadowOffset: { height: 2, width: 2 },
    shadowOpacity: 0.8
  },
  profileImage: {
    height: 50,
    width: 50,
    margin: 20
  },
  drawerTitleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  drawerTitleText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  seperator: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_SEPERATOR_LIGHT
  },
  footer: {
    height: 85,
    paddingLeft: 10,
    elevation: 0,
    shadowOffset: { height: 0, width: 0 }
  },
  footerTouchable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
});
