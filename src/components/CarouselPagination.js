import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import {
  COLOR_THEME_DARK,
  COLOR_THEME_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT,
  COLOR_BG_DARK_2,
  COLOR_BG_LIGHT
} from '../config/colors';

class RadioButton extends React.PureComponent {
  render() {
    const { isDarkMode, label, selected } = this.props;
    const colorTheme = isDarkMode ? COLOR_THEME_DARK : COLOR_THEME_LIGHT;
    const textColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <View style={styles.mainView}>
        <View
          style={[
            styles.outerView,
            {
              borderColor: selected
                ? colorTheme
                : isDarkMode
                ? COLOR_BG_DARK_2
                : COLOR_BG_LIGHT
            }
          ]}
        >
          {!selected ? (
            <View
              style={[
                styles.innerViewSelected,
                {
                  backgroundColor: isDarkMode
                    ? COLOR_BG_LIGHT
                    : COLOR_THEME_LIGHT
                }
              ]}
            />
          ) : null}
        </View>
        <View style={styles.labelView}>
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(RadioButton);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  outerView: {
    height: 10,
    width: 10,
    borderRadius: 12,
    borderWidth: 2,

    alignItems: 'center',
    justifyContent: 'center'
  },
  innerViewSelected: {
    height: 5,
    width: 5,
    borderRadius: 6
  },
  labelView: {
    paddingLeft: 10
  },
  label: {
    alignSelf: 'center',
    fontSize: 16
  }
});
