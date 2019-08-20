import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Container, Content, Item, Input } from 'native-base';
import { connect } from 'react-redux';
import {
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_TEXT_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_PLACEHOLDER_LIGHT,
  COLOR_THEME_DARK,
  COLOR_THEME_LIGHT,
  COLOR_BG_DARK_2,
  COLOR_BG_DARK_3
} from '../config/colors';
import Header from '../components/Header';
import { STR_FEEDBACK } from '../constants/strings';
import RadioButton from '../components/RadioButton';
import { isEqual } from '../utils';

const SCREEN_H = Dimensions.get('screen').height;

const BUG = 'Bug';
const FEATURE = 'Feature';
const INTERFACE = 'Interface';
const OTHERS = 'Others';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackType: BUG,
      feedbackMessage: ''
    };
  }

  _renderInfoView() {
    return (
      <View style={styles.infoView}>
        <Text style={styles.infoText}>
          Suggestions from you help us make this app better!
        </Text>
      </View>
    );
  }

  _renderRadioFormView() {
    const { feedbackType } = this.state;
    return (
      <View style={[styles.radioFormView]}>
        <View style={styles.radioFormInnerView}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <RadioButton
              selected={isEqual(feedbackType, BUG)}
              label={BUG}
              onPress={() => this.setState({ feedbackType: BUG })}
            />
            <RadioButton
              selected={isEqual(feedbackType, FEATURE)}
              label={FEATURE}
              onPress={() => this.setState({ feedbackType: FEATURE })}
            />
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <RadioButton
              selected={isEqual(feedbackType, INTERFACE)}
              label={INTERFACE}
              onPress={() => this.setState({ feedbackType: INTERFACE })}
            />
            <RadioButton
              selected={isEqual(feedbackType, OTHERS)}
              label={OTHERS}
              onPress={() => this.setState({ feedbackType: OTHERS })}
            />
          </View>
        </View>
      </View>
    );
  }

  _renderMessageInput() {
    const { isDarkMode } = this.props;
    const colorTheme = isDarkMode ? COLOR_THEME_DARK : COLOR_THEME_LIGHT;
    const cardBg = isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    const textColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <View
        style={[
          styles.shadow,
          styles.messageInput,
          { backgroundColor: cardBg }
        ]}
      >
        <Item style={[styles.itemStye, { backgroundColor: cardBg }]}>
          <Input
            placeholder='Content: Min 5 words'
            placeholderTextColor={COLOR_PLACEHOLDER_LIGHT}
            allowFontScaling={true}
            onChangeText={value =>
              this.setState({
                feedbackMessage: value
              })
            }
            multiline={true}
            value={this.state.feedbackMessage}
            style={[
              { height: 150, textAlignVertical: 'top' },
              { borderBottomWidth: 3, borderBottomColor: colorTheme, color: textColor }
            ]}
          />
        </Item>
        {this._renderSubmitButton()}
      </View>
    );
  }

  _renderSubmitButton() {
    const { isDarkMode } = this.props;
    const colorTheme = isDarkMode ? COLOR_BG_DARK_3 : COLOR_THEME_LIGHT;
    return (
      <View style={[styles.submitView]}>
        <TouchableOpacity
          style={[styles.submitButtonView, { backgroundColor: colorTheme }]}
        >
          <Text style={[styles.submitButtonText, { color: COLOR_TEXT_DARK }]}>
            Send
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const bgColor = this.props.isDarkMode ? COLOR_BG_DARK_2 : COLOR_BG_LIGHT;
    return (
      <Container>
        <Header title={STR_FEEDBACK} />
        <Content style={{ backgroundColor: bgColor }}>
          {this._renderInfoView()}
          {this._renderRadioFormView()}
          {this._renderMessageInput()}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(Feedback);

const styles = StyleSheet.create({
  infoView: {
    flex: 1,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10
  },
  infoText: {
    color: COLOR_TEXT_LIGHT,
    alignSelf: 'center',
    textAlign: 'center'
  },
  radioFormView: {
    flex: 1,
    marginBottom: 10
  },
  radioFormInnerView: {
    flex: 1,
    height: SCREEN_H * 0.15,
    padding: 10,
    paddingLeft: 50
  },
  itemStye: {
    flex: 1,
    backgroundColor: COLOR_BG_LIGHT,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderBottomWidth: 0
  },
  messageInput: {
    marginBottom: 15,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    margin: 10,
    flexDirection: 'column'
  },
  submitView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
  },
  submitButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    padding: 10,
    borderRadius: 99,
    backgroundColor: COLOR_BG_LIGHT
  },
  submitButtonText: {
    color: COLOR_BG_LIGHT,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20
  },
  shadow: {
    backgroundColor: 'white',
    elevation: 3,
    shadowOffset: { height: 3, width: 3 },
    shadowColor: 'grey',
    shadowOpacity: 0.8
  }
});
