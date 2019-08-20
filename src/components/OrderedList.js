import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT,
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_THEME_DARK
} from '../config/colors';

class OrderedList extends React.PureComponent {
  render() {
    const { isDarkMode, items } = this.props;
    const color = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    const backgroundColor = isDarkMode ? COLOR_BG_DARK : COLOR_THEME_DARK;
    return items.map((item, index) => (
      <View style={[styles.orderedListView, { backgroundColor }]}>
        <View style={styles.itemView}>
          <Text style={[styles.indexText, { color }]}>{index + 1}</Text>
          <Text style={[styles.itemText, { color }]}>{item}</Text>
        </View>
      </View>
    ));
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(OrderedList);

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  orderedListView: {
    flex: 1,
    flexDirection: 'column',
    padding: 15
  },
  indexText: {
    flex: 1
  },
  itemText: {
    flex: 10,
    fontFamily: 'MuktaMalar-Regular',
    textAlign: 'justify'
  }
});
