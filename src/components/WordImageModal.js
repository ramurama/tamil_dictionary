import React from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import BackButton from './BackButton';
import { COLOR_BG_DARK, COLOR_BG_LIGHT } from '../config/colors';

const SCREEN_W = Dimensions.get('window').width;

class WordImageModal extends React.PureComponent {
  render() {
    const { image, onBackPress, visible, isDarkMode } = this.props;
    const backgroundColor = isDarkMode ? COLOR_BG_DARK : COLOR_BG_LIGHT;
    return (
      <Modal animationType='fade' transparent={false} visible={visible}>
        <View style={[styles.mainView, { backgroundColor }]}>
          <View style={styles.navigationView}>
            <BackButton handler={() => onBackPress()} />
          </View>
          {/* <View style={styles.wordView}>
            <Text style={styles.wordText}>{word}</Text>
          </View> */}
          <View style={styles.imageView}>
            <Image source={image} style={styles.image} resizeMode='cover' />
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(WordImageModal);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column'
  },
  navigationView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingLeft: 10,
    paddingTop: 15
  },

  wordView: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  // wordText: {
  //   color: TEXT_COLOR_DEFAULT,
  //   fontSize: 26,
  //   fontFamily: 'MuktaMalar-Regular'
  // },
  imageView: {
    flex: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: SCREEN_W * 0.6,
    width: SCREEN_W
  }
});
