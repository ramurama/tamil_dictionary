import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import {
  COLOR_DRAWER_TEXT_DARK,
  COLOR_DRAWER_TEXT_LIGHT
} from '../config/colors';

class DrawerItem extends React.PureComponent {
  render() {
    const { image, title, onPress } = this.props;
    const textColor = this.props.isDarkMode
      ? COLOR_DRAWER_TEXT_DARK
      : COLOR_DRAWER_TEXT_LIGHT;
    return (
      <TouchableOpacity style={styles.mainView} onPress={() => onPress()}>
        <View style={styles.imageView}>
          <Image source={image} style={styles.image} resizeMode='contain' />
        </View>
        <View style={styles.titleView}>
          <Text style={[styles.titleText, { color: textColor }]}>{title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(DrawerItem);

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  image: {
    height: 25,
    width: 25
  },
  titleView: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
