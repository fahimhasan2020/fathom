import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity
} from 'react-native';
import styles from './styles';

export default class FindTextAreaSimple extends Component {
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
      secureTextEntry,
      editable,
      label,
      onFocus,
      placeholder,
      accessibilityLabel,
      style,
      labelStyle,
      labelAdditional
    } = this.props;
    const returnKey = true;
    return (
      <TouchableOpacity
        onPress={this.focus}
        activeOpacity={1}
        style={styles.mainContainer}
      >
        <View style={styles.innerContainer}>
          <Text
            style={!labelStyle ? styles.labelTextStyle : labelStyle}
            accessibilityLabel={`${label} Field`}
          >
            {label}
            {labelAdditional}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            ref={input => {
              this.input = input;
            }}
            value={value}
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
            error={error}
            style={[style, { padding: 10 }]}
            multiline={returnKey}
            accessibilityLabel={accessibilityLabel}
          />
        </View>
        {!error ? null : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}
