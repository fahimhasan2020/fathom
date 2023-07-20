import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { commonStyle as cs } from '../../styles';
import colors from '../../Colors';
import styles from './styles';

export default class InputPlain extends Component {
  static propTypes = {
    error: PropTypes.string,
    value: PropTypes.any.isRequired,
    clearTextOnFocus: PropTypes.bool,
    secureTextEntry: PropTypes.bool,
    editable: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    label: PropTypes.string,
    onFocus: PropTypes.func,
    returnKeyType: PropTypes.string,
    accessible: PropTypes.bool,
    accessibilityLabel: PropTypes.string,
    placeholder: PropTypes.string
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
    accessible: false,
    accessibilityLabel: '',
    placeholder: ''
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
      accessible,
      accessibilityLabel,
      placeholder
    } = this.props;
    const returnKey = true;
    return (
      <View style={cs.flexOneContainer}>
        <TextField
          ref={input => {
            this.input = input;
          }}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          value={value}
          autoCapitalize="none"
          autoCorrect={false}
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
          titleTextStyle={styles.labelStyle}
          containerStyle={styles.containerHeight}
          error={error}
          placeholder={placeholder}
        />
      </View>
    );
  }
}
