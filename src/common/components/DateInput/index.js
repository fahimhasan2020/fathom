import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import colors from '../../Colors';
import { commonStyle as cs } from '../../styles';

export default class DateInput extends Component {
  static propTypes = {
    error: PropTypes.string,
    value: PropTypes.any.isRequired,
    icon: PropTypes.any,
    clearTextOnFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    label: PropTypes.string,
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    onPress: PropTypes.func,
    iconStyle: PropTypes.any,
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
    style: PropTypes.any,
  };

  static defaultProps = {
    error: '',
    icon: '',
    iconStyle: null,
    onSubmit: () => {},
    onChange: () => {},
    onFocus: () => {},
    onPress: () => {},
    clearTextOnFocus: false,
    secureTextEntry: false,
    returnKeyType: 'next',
    label: null,
    accessible: false,
    accessibilityLabel: '',
    style: null
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
      icon,
      style,
      label,
      onFocus,
      onPress,
      iconStyle
    } = this.props;
    const returnKey = true;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.mainContainer}
        accessible={accessible}
      >
        <View style={styles.labelContainer}>
          <Text style={styles.labelStyle} accessibilityLabel={`${label} Field`}>
            {label}
          </Text>
        </View>
        <TouchableOpacity onPress={onPress} style={cs.flexOneContainer}>
          <TextInput
            ref={input => {
              this.input = input;
            }}
            value={value}
            placeholderTextColor="rgba(66, 67, 67, 0.38)"
            autoCapitalize="none"
            autoCorrect={false}
            editable={false}
            enablesReturnKeyAutomatically={returnKey}
            clearTextOnFocus={clearTextOnFocus}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            returnKeyType={returnKeyType}
            label={label}
            textColor={colors.tealBlue}
            tintColor={colors.tealBlue}
            labelTextStyle={styles.labelTextStyle}
            titleTextStyle={styles.labelTextStyle}
            containerStyle={styles.inputContainerHeight}
            style={style}
            accessibilityLabel={accessibilityLabel}
          />
          {!icon ? null : (
            <View style={styles.iconContainer}>
              <Image source={icon} style={iconStyle} />
            </View>
          )}
        </TouchableOpacity>
        {!error ? null : (
          <View style={cs.flexOneContainer}>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
