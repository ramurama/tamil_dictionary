import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { connect } from 'react-redux';
import {
  COLOR_DELETE_BG,
  COLOR_SUBTITLE,
  COLOR_BG_DARK,
  COLOR_BG_LIGHT,
  COLOR_TEXT_DARK,
  COLOR_TEXT_LIGHT
} from '../config/colors';

const { width, height } = Dimensions.get('window');

class SavedItem extends React.PureComponent {
  _renderDeleteButton() {
    return (
      <View style={styles.deleteButtonView}>
        <Image
          source={require('../../assets/images/delete/delete.png')}
          style={styles.deleteImage}
          resizeMode='contain'
        />
      </View>
    );
  }

  render() {
    const {
      tamilWord,
      engWord,
      onPress,
      onDelete,
      image,
      wordId,
      isDarkMode
    } = this.props;
    const bgColor = isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    const tamilWordColor = isDarkMode ? COLOR_TEXT_DARK : COLOR_TEXT_LIGHT;
    return (
      <Swipeout
        right={[
          {
            component: this._renderDeleteButton(),
            backgroundColor: COLOR_DELETE_BG,
            onPress: () => onDelete(wordId)
          }
        ]}
        style={{
          backgroundColor: bgColor
        }}
      >
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => onPress(wordId)}
        >
          <View style={styles.imageView}>
            <Image source={image} style={styles.image} resizeMode='cover' />
          </View>
          <View style={styles.wordView}>
            <View style={styles.tamilWordView}>
              <Text style={[styles.tamilWordText, { color: tamilWordColor }]}>
                {tamilWord}
              </Text>
            </View>
            <View style={styles.engWordView}>
              <Text style={styles.engWordText}>{`en. ${engWord}`}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(SavedItem);

const styles = StyleSheet.create({
  deleteButtonView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteImage: {
    height: 25,
    width: 25
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    height: height * 0.14
  },
  imageView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: 10
  },
  wordView: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  tamilWordView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft: 15
  },
  tamilWordText: {
    fontSize: 25
  },
  engWordView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15
  },
  engWordText: {
    fontSize: 18,
    color: COLOR_SUBTITLE,
    marginBottom: 15
  }
});
