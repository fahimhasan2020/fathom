import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, ScrollView } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { getHeightPercentage } from '../../Helper';
import styles from './styles';
import colors from '../../Colors';
// import { commonStyle as cs } from '../../styles';
// import { i18strings } from '../../locales/i18n';

export default class FindInputMask extends Component {
  static propTypes = {
    error: PropTypes.string,
    value: PropTypes.any.isRequired,
    clearTextOnFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    style: PropTypes.any,
    icon: PropTypes.any,
    iconStyle: PropTypes.any,
    padding: PropTypes.bool,
    keyboardType: PropTypes.any,
    selection: PropTypes.bool,
    autoFocus: PropTypes.bool,
    maxLength: PropTypes.number,
    mask: PropTypes.any,
    type: PropTypes.any,
    labelAdditional: PropTypes.any,
    labelStyle: PropTypes.any
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
    placeholder: null,
    style: null,
    icon: null,
    iconStyle: null,
    padding: true,
    keyboardType: 'default',
    selection: false,
    autoFocus: false,
    maxLength: 30,
    mask: null,
    type: 'custom',
    labelAdditional: null,
    labelStyle: null
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
      icon,
      secureTextEntry,
      editable,
      label,
      onFocus,
      placeholder,
      style,
      // accessibilityLabel,
      iconStyle,
      padding,
      keyboardType,
      selection,
      autoFocus,
      maxLength,
      mask,
      type,
      labelStyle,
      labelAdditional
    } = this.props;
    const returnKey = true;
    return (
      <View
        style={{
          height: error ? error.length > 70 ? getHeightPercentage(15) : getHeightPercentage(12) : !label ? getHeightPercentage(5) : getHeightPercentage(9),
          paddingHorizontal: !padding ? 0 : 25
        }}
      >
        {!label ? null : (
          <View style={[styles.labelContainer, label.length > 70 ? { flex: 1.4 } : null]}>
            <Text style={!labelStyle ? styles.labelStyle : labelStyle} accessibilityLabel={`${label} Field`}>
              {label}
              {labelAdditional}
            </Text>
          </View>
        )}
        <View style={!label ? styles.inputOuterContainerAlt : styles.inputOuterContainer}>
          {!editable ? (
            <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>
              <Text style={style}>{value}</Text>
            </ScrollView>
          ) : (
            <TextInputMask
              ref={input => {
                this.input = input;
              }}
              type={type}
              options={mask}
              value={value}
              autoFocus={autoFocus}
              selectTextOnFocus={selection}
              placeholder={placeholder}
              placeholderTextColor="rgba(46, 46, 46, 0.6)"
              autoCapitalize="none"
              // autoCorrect={false}
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
              labelTextStyle={styles.labelTextStyle}
              titleTextStyle={styles.labelTextStyle}
              containerStyle={styles.inputContainerHeight}
              error={error}
              style={style}
              accessible
              maxLength={maxLength}
              keyboardType={keyboardType}
              accessibilityLabel={`${label} Input Field, value: ${value}`}
            />
          )}
          {!icon ? null : (
            <View style={styles.iconContainer}>
              <Image source={icon} style={iconStyle} />
            </View>
          )}
        </View>
        {!error ? null : (
          <View>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
}
