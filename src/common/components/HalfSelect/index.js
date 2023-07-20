import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import colors from '../../Colors';
import styles from './styles';
import { commonStyle as cs } from '../../styles';

export default class HalfSelect extends Component {
  static propTypes = {
    error: PropTypes.string,
    value: PropTypes.any.isRequired,
    iconTwo: PropTypes.any,
    clearTextOnFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    label: PropTypes.string,
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    onPress: PropTypes.func,
    iconTwoStyle: PropTypes.any,
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.string
  };

  static defaultProps = {
    error: '',
    iconTwo: '',
    iconTwoStyle: null,
    onSubmit: () => {},
    onChange: () => {},
    onFocus: () => {},
    onPress: () => {},
    clearTextOnFocus: false,
    secureTextEntry: false,
    returnKeyType: 'next',
    label: null,
    accessible: false,
    accessibilityLabel: ''
  };

  focus = () => {
    this.input.focus();
  };

  render() {
    const {
      error,
      value,
      onChange,
      onSubmit,
      clearTextOnFocus,
      returnKeyType,
      accessible,
      accessibilityLabel,
      secureTextEntry,
      iconTwo,
      label,
      onFocus,
      onPress,
      iconTwoStyle
    } = this.props;
    const returnKey = true;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.mainContainer}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
      >
        <View style={cs.flexOneContainer}>
          <TextField
            ref={input => {
              this.input = input;
            }}
            value={value}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={returnKey}
            clearTextOnFocus={clearTextOnFocus}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            editable={false}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            returnKeyType={returnKeyType}
            label={label}
            textColor="rgba(46, 46, 46, 0.6)"
            tintColor={colors.tealBlue}
            labelTextStyle={styles.labelStyle}
            titleTextStyle={styles.labelStyle}
            containerStyle={styles.containerHeight}
            error={error}
          />
          <View style={styles.iconContainer}>
            <Image source={iconTwo} style={iconTwoStyle} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
