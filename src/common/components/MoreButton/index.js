import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { getWidthPercentage } from '../../Helper';
import styles from './styles';
import images from '../../Images';
import { i18strings } from '../../locales/i18n';

export default class MoreButton extends Component {
  static propTypes = {
    error: PropTypes.string,
    itemID: PropTypes.string,
    onPress: PropTypes.func,
    label: PropTypes.string,
    nullText: PropTypes.string,
    arrowDown: PropTypes.bool,
    value: PropTypes.array,
    deselect: PropTypes.func,
    width: PropTypes.number,
    noArrow: PropTypes.bool,
    icon: PropTypes.any,
    labelAdditional: PropTypes.any,
    labelStyle: PropTypes.any
  };

  static defaultProps = {
    error: '',
    onPress: () => {},
    itemID: null,
    label: null,
    nullText: null,
    arrowDown: false,
    value: [],
    deselect: () => {},
    width: 0,
    noArrow: false,
    icon: null,
    labelAdditional: null,
    labelStyle: null
  };

  deselect = item => {
    const { value, itemID, deselect } = this.props;
    const results = value.filter(data => data[itemID] !== item[itemID]);
    deselect(results);
  };

  render() {
    const {
      error,
      onPress,
      label,
      nullText,
      arrowDown,
      value,
      width,
      noArrow,
      labelAdditional,
      icon,
      labelStyle,
      accessibilityLabelInput
    } = this.props;
    let emptyFlag = true;
    if (value && value.length > 0) {
      emptyFlag = false;
    }
    const horizontal = true;
    const TouchMe = !onPress ? View : TouchableOpacity;
    return (
      <View>
        <TouchMe
          accessible={false}
          style={[
            styles.morebuttonContainer,
            {
              width: !width ? getWidthPercentage(94) : width
            },
          ]}
          onPress={onPress}
        >
          <View style={{ flexDirection: 'row' }}>
            {!icon ? null : <Image  style={styles.userImageIcon} source={icon} />}
            <Text
              style={!labelStyle ? styles.morebuttontitleText : labelStyle}
              accessibilityLabel={`${label} Field`}
            >
              {label}
              {labelAdditional}
            </Text>
          </View>
          <View style={styles.morebuttoninnerContainer}>
            {emptyFlag ? (
              <Text style={styles.morebuttonnullText}>{nullText}</Text>
            ) : (
              value.map(item => {
                return (
                  <View
                    horizontal={horizontal}
                    style={styles.morebuttoncontentContainer}
                    key={
                      item.title ||
                      item.name ||
                      item.descriptionText ||
                      item.FullName ||
                      item.text
                    }
                  >
                    <Text
                      style={styles.morebuttonactionText}
                      accessibilityLabel={`${accessibilityLabelInput} ${item.title ||
                        item.name ||
                        item.descriptionText}`}
                    >
                      {
                        item.title ||
                        item.name ||
                        item.descriptionText ||
                        item.FullName ||
                        item.text
                      }
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
        </TouchMe>
        {!error ? null : (
          <View>
            <Text style={styles.errorTextStyle}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
}
