import React from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import {
  COLOR_THEME_DARK,
  COLOR_THEME_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT
} from '../config/colors';

class RadioButton extends React.PureComponent {
  render() {
    const { isDarkMode, onPress, label, selected } = this.props;
    const colorTheme = isDarkMode ? COLOR_THEME_DARK : COLOR_THEME_LIGHT;
    const textColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <View style={styles.mainView}>
          <View style={[styles.outerView, { borderColor: colorTheme }]}>
            {selected ? (
              <View
                style={[
                  styles.innerViewSelected,
                  { backgroundColor: colorTheme }
                ]}
              />
            ) : null}
          </View>
          <View style={styles.labelView}>
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    height: 14,
    width: 14,
    borderRadius: 12,
    borderWidth: 1,

    alignItems: 'center',
    justifyContent: 'center'
  },
  innerViewSelected: {
    height: 9,
    width: 9,
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
