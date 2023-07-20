import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, Image, TouchableOpacity } from 'react-native';
import colors from '../../Colors';
import images from '../../Images';
import { getHeightPercentage, fullHeight } from '../../Helper';
import styles from './styles';
import { i18strings } from '../../locales/i18n';

export default class FindTextArea extends Component {
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
    toggleState: PropTypes.any,
    toggle: PropTypes.any,
    suggestionPressed: PropTypes.any,
    getSuggestionPressed: PropTypes.any,
    subCategories: PropTypes.array
    // attachments: PropTypes.any
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
    toggle: null,
    toggleState: false,
    suggestionPressed: null,
    getSuggestionPressed:  () => {},
    subCategories: []
    // attachments: null
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
      // attachments,
      secureTextEntry,
      editable,
      label,
      onFocus,
      placeholder,
      style,
      toggle,
      toggleState,
      labelInfo,
      subCategories,
      accessibilityLabel,
      suggestionPressed,
      getSuggestionPressed
    } = this.props;
    const returnKey = true;
    return (
      <View
        style={{
          height: getHeightPercentage(toggleState ? fullHeight > 800 ? 28.5 : 32 : 9),
          paddingHorizontal: 25
        }}
      >
        <View
          style={[
            labelInfo ? styles.innerContainerAlt : styles.innerContainer,
            {
              borderBottomWidth: toggleState ? 0 : 2,
              borderBottomColor: toggleState ? colors.white : colors.grey
            }
          ]}
        >
          <Text style={styles.labelStyle}>{label}</Text>
          <TouchableOpacity
            onPress={toggle}
            accessibilityLabel={
              toggleState
                ? i18strings('accessibility.reduceBtn')
                : i18strings('accessibility.expandBtn')
            }
            style={styles.expandBtn}
          >
            <Image
              source={toggleState ? images.reduce : images.expand}
              style={styles.moreIconStyle}
            />
          </TouchableOpacity>
        </View>
        {!labelInfo ? null : <Text style={styles.labelInfoText}>{labelInfo}</Text>}
        {!toggleState ? null : (
          <View style={styles.inputContainerHeight}>
            <TextInput
              accessibilityLabel={accessibilityLabel}
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
              style={style}
              multiline={returnKey}
            />
          </View>
        )}
        {!toggleState ? null : (
          <View style={styles.toggleContainer}>
            {/* <TouchableOpacity
              accessible
              accessibilityLabel="Attach Link Button"
              onPress={attachments}
              style={styles.toggleButton}
            >
              <Image
                style={styles.toggleImage}
                source={images.attach}
              />
              <Text style={styles.labelTextStyle}>
                Attach
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              accessible
              accessibilityLabel="Get Suggestions Button"
              style={styles.attachButton}
              onPress={getSuggestionPressed}
            >
              <Image style={styles.attachImage} source={images.suggestions} />
              <Text style={styles.labelTextStyle}>
                Get Suggestions
                <Text style={styles.infoText}>
                  {' - Select sub-categories for your request'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!subCategories.length ? null : (
          <TouchableOpacity
            onPress={suggestionPressed}
            style={styles.suggestionConatiner}
          >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.suggestionsText}>
              {subCategories.length > 3 ? subCategories.slice(0,3).join(', ') : subCategories.join(', ')}
              {subCategories.length > 3 ? (
                <Text style={styles.moreText}> + {subCategories.length - 3} more</Text>
              ) : null}
            </Text>
          </TouchableOpacity>
        )}
        {!toggleState && !error ? null : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
}
