import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import colors from '../../Colors';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Colors from '../../Colors';

export default class FindInput extends Component {
  static propTypes = {
    error: PropTypes.string,
    //  value: PropTypes.any.isRequired,
    clearTextOnFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onPressIcon: PropTypes.func,
    onChangeText: PropTypes.func,
    onSubmit: PropTypes.func,
    onBlur: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    style: PropTypes.any,
    padding: PropTypes.bool,
    keyboardType: PropTypes.any,
    selection: PropTypes.bool,
    autoFocus: PropTypes.bool,
    maxLength: PropTypes.number,
    labelAdditional: PropTypes.any,
    labelStyle: PropTypes.any
  };

  static defaultProps = {
    error: '',
    onSubmit: () => { },
    onChange: () => { },
    onFocus: () => { },
    onBlur: () => { },
    onChangeText: () => { },
    onPressIcon: () => { },
    editable: true,
    clearTextOnFocus: false,
    secureTextEntry: false,
    returnKeyType: 'next',
    label: null,
    placeholder: null,
    style: null,
    icon: null,
    iconLabel: null,
    iconStyle: null,
    iconName: null,
    padding: true,
    keyboardType: 'default',
    selection: false,
    autoFocus: false,
    maxLength: 30,
    labelAdditional: '',
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
      onPressIcon,
      onBlur,
      clearTextOnFocus,
      returnKeyType,
      icon,
      iconName,
      secureTextEntry,
      editable,
      onFocus,
      placeholder,
      keyboardType,
      selection,
      autoFocus,
      maxLength,
    } = this.props;
    const returnKey = true;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          {iconName ? <MaterialIcons name={iconName} size={25} color={Colors.blue} /> : null}

          <TextInput
            ref={input => {
              this.input = input;
            }}
            value={value}
            autoFocus={autoFocus}
            selectTextOnFocus={selection}
            placeholder={placeholder}
            placeholderTextColor={colors.lightPurple}
            autoCapitalize="none"
            autoCorrect={false}
            enablesReturnKeyAutomatically={returnKey}
            clearTextOnFocus={clearTextOnFocus}
            secureTextEntry={secureTextEntry}
            onFocus={onFocus}
            onBlur={onBlur}
            editable={editable}
            onChangeText={onChange}
            onSubmitEditing={onSubmit}
            returnKeyType={returnKeyType}
            textColor={colors.lightWhite}
            error={error}
            style={styles.inputFieldsContainer}
            accessible
            maxLength={maxLength}
            keyboardType={keyboardType}
          />
          {!icon ? <View style={{ height: 20, width: 20 }}></View> : (
            <TouchableOpacity onPress={onPressIcon}>
              <Image source={icon} style={styles.iconStyles} />
            </TouchableOpacity>
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
