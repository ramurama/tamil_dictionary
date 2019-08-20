import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'native-base';
import {
  LIST_ITEM_TEXT_COLOR,
  WHITE,
  GREY_LIGHT_TEXT,
  COLOR_SWITCH_GREEN,
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT,
  COLOR_BG_DARK_3,
  COLOR_BG_LIGHT,
  COLOR_THEME_LIGHT
} from '../config/colors';
import { Switch } from 'react-native-switch';
import { connect } from 'react-redux';

class SettingItem extends React.PureComponent {
  render() {
    const {
      enableTouch,
      icon,
      title,
      navigation,
      toggle,
      toggleStatus,
      onTogglePress,
      onClick,
      leftIcon,
      subTitle,
      isDarkMode
    } = this.props;
    const textColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;

    return (
      <TouchableOpacity disabled={!enableTouch} onPress={() => onClick()}>
        <View style={styles.mainView}>
          {leftIcon && (
            <View style={styles.iconView}>
              <Image source={icon} style={styles.image} resizeMode='contain' />
            </View>
          )}
          <View style={{ flex: 6, flexDirection: 'column' }}>
            <View style={styles.titleTextView}>
              <Text style={[styles.titleText, { color: textColor }]}>
                {title}
              </Text>
            </View>
            {subTitle !== undefined && (
              <View style={styles.subtitleTextView}>
                <Text style={[styles.subtitleText, { color: textColor }]}>
                  {subTitle}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.iconView}>
            {navigation && (
              <Icon
                name='chevron-right'
                style={[
                  styles.navIcon,
                  { color: isDarkMode ? COLOR_BG_DARK_3 : COLOR_THEME_LIGHT }
                ]}
                type='MaterialCommunityIcons'
              />
            )}
            {toggle && (
              <Switch
                value={toggleStatus}
                onValueChange={val => onTogglePress(val)}
                disabled={false}
                activeText={''}
                inActiveText={''}
                circleSize={16}
                barHeight={20}
                circleBorderWidth={1}
                backgroundActive={
                  isDarkMode ? COLOR_SWITCH_GREEN : COLOR_THEME_LIGHT
                }
                backgroundInactive={'grey'}
                circleActiveColor={COLOR_BG_LIGHT}
                circleInActiveColor={COLOR_BG_LIGHT}
                changeValueImmediately={true}
                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                innerCircleStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: 'white',
                //   elevation: 2,
                //   shadowOffset: { height: 2, width: 0 },
                //   shadowColor: 'white',
                //   shadowOpacity: 0.8
                }} // style for inner animated circle for what you (may) be rendering inside the circle
                outerCircleStyle={{ borderColor: 'white' }} // style for outer animated circle
                renderActiveText={false}
                renderInActiveText={false}
                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                switchWidthMultiplier={2.3} // multipled by the `circleSize` prop to calculate total width of the Switch
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(SettingItem);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    marginRight: 10,
    marginLeft: 5,
    paddingTop: 15,
    paddingBottom: 15
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  titleText: {
    fontWeight: '400',
    fontSize: 16
    // fontFamily: 'Questrial'
  },
  subtitleTextView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15
  },
  subtitleText: {},
  navIcon: {},
  image: {
    height: 25,
    width: 25
  }
});
