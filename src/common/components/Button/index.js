import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';

export default class Button extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string.isRequired,
    badgeText: PropTypes.any,
    badgeStyle: PropTypes.any,
    badgeTextStyle: PropTypes.any,
    textStyle: PropTypes.any.isRequired,
    isLoading: PropTypes.bool,
    showDot: PropTypes.bool,
    notificationCount: PropTypes.number,
    disabled: PropTypes.bool,
    loadingColor: PropTypes.any,
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
    accessibilityComponentType: PropTypes.string
  };

  static defaultProps = {
    onPress: () => { },
    showDot: false,
    notificationCount: null,
    imageStyle: null,
    isLoading: false,
    disabled: false,
    loadingColor: null,
    accessible: false,
    accessibilityLabel: '',
    accessibilityComponentType: 'button'
  };

  Logout = () => {
    console.log('Something');
  };

  render() {
    const TouchableWrapper =
      Platform.OS === 'ios'
        ? TouchableWithoutFeedback
        : TouchableNativeFeedback;
    const {
      isLoading,
      onPress,
      text,
      loadingColor,
      textStyle,
      accessible,
      accessibilityLabel,
      accessibilityComponentType
    } = this.props;
    return (
        <View style={{ bottom: 20 }}>
          <View style={styles.buttonContainer}>
            <TouchableWrapper
              accessible={accessible}
              accessibilityLabel={accessibilityLabel}
              accessibilityComponentType={accessibilityComponentType}
              disabled={isLoading }
              onPress={onPress}
            >
              {!isLoading ? (
                <Text style={textStyle}>{text}</Text>
              ) : (
                  <ActivityIndicator size="small" color={loadingColor} />
                )}
            </TouchableWrapper>
          </View>
          </View>
    );
  }
}
