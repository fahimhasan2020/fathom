import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Platform,
  Image,
} from 'react-native';

export default class IconButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: PropTypes.any.isRequired,
    imageStyle: PropTypes.any.isRequired,
    source: PropTypes.any.isRequired,
  };

  static defaultProps = {
    onPress: () => {},
  };

  Logout = () => {
    console.log('Something');
  };

  render() {
    const TouchableWrapper =
      Platform.OS === 'ios'
        ? TouchableWithoutFeedback
        : TouchableNativeFeedback;
    const { onPress, source, style, imageStyle } = this.props;
    return (
      <TouchableWrapper onPress={onPress}>
        <View style={style}>
          <Image source={source} style={imageStyle} />
        </View>
      </TouchableWrapper>
    );
  }
}
