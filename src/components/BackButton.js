import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

class BackButton extends React.Component {
  render() {
    const { isDarkMode, disableColor, handler } = this.props;
    const backImage =
      disableColor || isDarkMode
        ? require('../../assets/images/back/back_dark.png')
        : require('../../assets/images/back/back_light.png');
    return (
      <TouchableOpacity
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          },
          this.props.style
        ]}
        onPress={() => {
          if (!handler) {
            this.props.navigation.goBack();
          } else {
            this.props.handler();
          }
        }}
      >
        <Image
          source={backImage}
          style={{ height: 20, width: 20 }}
          resizeMode='contain'
        />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  isDarkMode: state.isDarkMode
});

export default connect(mapStateToProps)(withNavigation(BackButton));
