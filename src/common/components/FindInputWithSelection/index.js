import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import { getResponsiveInputHeight } from '../../Helper';
import styles from './styles';
import colors from '../../Colors';
import images from '../../Images';
import { commonStyle as cs } from '../../styles';
import { i18strings } from '../../locales/i18n';

export default class FindInputWithSelection extends Component {
  static propTypes = {
    error: PropTypes.string,
    value: PropTypes.any.isRequired,
    selected: PropTypes.any,
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
    arrowDown: PropTypes.bool,
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
    selected: [],
    keyboardType: 'default',
    arrowDown: false
  };

  focus = () => {
    this.input.focus();
  };

  deselect = item => {
    const { selected, itemID, deselect } = this.props;
    const results = selected.filter(data => data[itemID] !== item[itemID]);
    deselect(results);
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
      selected,
      noArrow,
      nullText,
      arrowDown
    } = this.props;
    const returnKey = true;
    let emptyFlag = true;
    if (selected && selected.length > 0) {
      emptyFlag = false;
    }
    const horizontal = true;
    return (
      <View
        style={{
          justifyContent: 'flex-end',
          height: getResponsiveInputHeight(selected.length),
          paddingHorizontal: !padding ? 0 : 25
        }}
      >
        {selected.length || !label ? null : (
          <View style={styles.labelContainer}>
            <Text style={styles.labelStyle} accessibilityLabel={`${label} Field`}>
              {label}
            </Text>
          </View>
        )}
        <View style={styles.inputOuterContainer}>
          {!selected.length ? null : (
            <View style={styles.rowPart}>
              <View style={styles.morebuttoninnerContainer}>
                {emptyFlag ? (
                  <Text style={styles.morebuttonnullText}>{nullText}</Text>
                ) : (
                  selected.map(item => {
                    return (
                      <View
                        horizontal={horizontal}
                        style={styles.morebuttoncontentContainer}
                        key={
                          item.UserId ||
                          item.title ||
                          item.name ||
                          item.descriptionText ||
                          item.FullName
                        }
                      >
                        <Text
                          style={styles.morebuttonactionText}
                        >
                          {item.title ||
                            item.name ||
                            item.descriptionText ||
                            item.FullName}
                        </Text>
                        <TouchableOpacity
                          style={styles.crossButton}
                          onPress={() => this.deselect(item)}
                        >
                          <Image
                            accessibilityLabel={i18strings('accessibility.removeBtn')}
                            source={images.cross}
                            style={styles.imageStyle}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })
                )}
                {noArrow ? null : (
                  <Image
                    style={{
                      width: arrowDown ? 12 : 7.4,
                      height: arrowDown ? 7.4 : 12,
                      position: 'absolute',
                      right: 10,
                      top: 5
                    }}
                    source={arrowDown ? images.expand : images.expandHoriz}
                  />
                )}
              </View>
            </View>
          )}
          <View style={styles.rowPart}>
            <TextInput
              ref={input => {
                this.input = input;
              }}
              value={value}
              placeholder={selected.length ? '' : placeholder}
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
              keyboardType={keyboardType}
              accessibilityLabel={`${label} Input Field, value: ${value}`}
            />
          </View>
          {!icon ? null : (
            <View style={styles.iconContainer}>
              <Image source={icon} style={iconStyle} />
            </View>
          )}
        </View>
        {!error ? null : (
          <View style={cs.flexOneContainer}>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
}
