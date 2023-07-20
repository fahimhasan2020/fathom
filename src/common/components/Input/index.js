import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import colors from '../../Colors';
import { commonStyle as cs } from '../../styles';
import styles from './styles';
import Colors from '../../Colors';

export default class Input extends Component {
  static propTypes = {
    error: PropTypes.string,
    value: PropTypes.any.isRequired,
    icon: PropTypes.any,
    clearTextOnFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    label: PropTypes.string,
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    iconStyle: PropTypes.any,
    accessible: PropTypes.bool,
    autoCorrect: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.any,
    noPadding: PropTypes.bool,
    placeholder: PropTypes.string,
    showHighlight: PropTypes.bool
  };

  static defaultProps = {
    error: '',
    onSubmit: () => {},
    onChange: () => {},
    onFocus: () => {},
    editable: true,
    clearTextOnFocus: false,
    secureTextEntry: false,
    returnKeyType: 'next',
    label: null,
    iconStyle: null,
    accessible: false,
    autoCorrect: false,
    accessibilityLabel: '',
    icon: null,
    maxLength: 30,
    keyboardType: 'default',
    noPadding: false,
    placeholder: '',
    showHighlight: false
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
      secureTextEntry,
      icon,
      editable,
      label,
      onFocus,
      iconStyle,
      accessible,
      accessibilityLabel,
      autoCorrect,
      maxLength,
      keyboardType,
      noPadding,
      placeholder,
      showHighlight
    } = this.props;
    const returnKey = true;
    return (
      <View style={!noPadding ? styles.mainContainer : styles.noPadding}>
        {icon ? (
          <View style={styles.iconContainer}>
            <Image
              source={icon}
              style={[cs.textFieldIcon, iconStyle || null]}
            />
          </View>
        ) : null}
        <View style={styles.textFieldContainer}>
          <TextField
            ref={input => {
              this.input = input;
            }}
            accessible={accessible}
            accessibilityLabel={accessibilityLabel}
            value={value}
            autoCapitalize="none"
            autoCorrect={autoCorrect}
            enablesReturnKeyAutomatically={returnKey}
            clearTextOnFocus={clearTextOnFocus}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            editable={editable}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            returnKeyType={returnKeyType}
            label={label}
            textColor={colors.tealBlue}
            tintColor={colors.tealBlue}
            labelTextStyle={styles.labelStyle}
            error={error}
            maxLength={maxLength}
            keyboardType={keyboardType}
            placeholder={placeholder}
            style={!showHighlight ? null : { backgroundColor: Colors.rememberHighlight }}
          />
        </View>
      </View>
    );
  }
}
