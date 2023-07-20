import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image, TouchableOpacity } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import colors from '../../Colors';
import { commonStyle as cs } from '../../styles';
import styles from './styles';

export default class Select extends Component {
  static propTypes = {
    error: PropTypes.string,
    value: PropTypes.any,
    icon: PropTypes.any,
    iconTwo: PropTypes.any,
    clearTextOnFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    label: PropTypes.string,
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    onPress: PropTypes.func,
    iconStyle: PropTypes.any,
    iconTwoStyle: PropTypes.any,
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
    noPadding: PropTypes.bool,
    placeholder: PropTypes.string,
    textColor: PropTypes.any,
    labelFontSize: PropTypes.any
  };

  static defaultProps = {
    error: '',
    value: '',
    icon: null,
    iconTwo: null,
    iconStyle: null,
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
    accessibilityLabel: '',
    noPadding: false,
    placeholder: '',
    textColor: colors.tealBlue,
    labelFontSize: 12
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
      iconTwo,
      label,
      onFocus,
      onPress,
      iconStyle,
      iconTwoStyle,
      noPadding,
      placeholder,
      textColor,
      labelFontSize
    } = this.props;
    const returnKey = true;
    return (
      <TouchableOpacity
        onPress={onPress}
        style={!noPadding ? styles.mainContainer : styles.noPadding}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
      >
        {!icon ? null : (
          <View style={styles.iconContainer}>
            <Image source={icon} style={[cs.textFieldIcon, iconStyle || null]} />
          </View>
        )}
        <View style={styles.textFieldContainer}>
          <TextField
            ref={input => {
              this.input = input;
            }}
            value={value}
            autoCapitalize="none"
            autoCorrect={false}
            labelFontSize={labelFontSize}
            enablesReturnKeyAutomatically={returnKey}
            clearTextOnFocus={clearTextOnFocus}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            editable={false}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            returnKeyType={returnKeyType}
            label={label}
            textColor={!textColor ? colors.tealBlue : textColor}
            tintColor={colors.tealBlue}
            labelTextStyle={styles.labelStyle}
            titleTextStyle={styles.labelStyle}
            containerStyle={styles.containerHeight}
            error={error}
            placeholder={placeholder}
          />
          <View style={styles.secondIconContainer}>
            <Image source={iconTwo} style={iconTwoStyle} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
