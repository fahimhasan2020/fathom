import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { getWidthPercentage } from '../../Helper';
import styles from './styles';
import images from '../../Images';
import { i18strings } from '../../locales/i18n';

export default class AddGuests extends Component {
  static propTypes = {
    itemID: PropTypes.string,
    onPress: PropTypes.func,
    label: PropTypes.string,
    nullText: PropTypes.string,
    arrowDown: PropTypes.bool,
    value: PropTypes.array,
    deselect: PropTypes.func,
    width: PropTypes.number,
    noArrow: PropTypes.bool,
    owner: PropTypes.string,
    rsvpValue: PropTypes.string,
    workspaceID: PropTypes.string,
    infoPressed: PropTypes.func
  };

  static defaultProps = {
    onPress: () => {},
    itemID: null,
    label: null,
    nullText: null,
    arrowDown: false,
    value: [],
    deselect: () => {},
    width: 0,
    noArrow: false,
    rsvpValue: 'AWT',
    workspaceID: '',
    infoPressed: () => {}
  };

  deselect = item => {
    const { value, itemID, deselect } = this.props;
    const results = value.filter(data => data[itemID] !== item[itemID]);
    deselect(results);
  };

  returnRSVPImage = (value) => {
    if (value === 'NO') {
        return images.crossFilled;
    } else if (value === 'YES') {
        return images.tickSelected;
    } else if (value === 'MYB') {
        return images.questionFilled;
    } else {
        return images.minusSelected;
    }
  }

  render() {
    const {
      onPress,
      label,
      // nullText,
      arrowDown,
      value,
      width,
      noArrow,
      accessibilityLabelInput,
      owner,
      workspaceID,
      rsvpValue,
      infoPressed
    } = this.props;
    let emptyFlag = true;
    if (value && value.length > 0) {
      emptyFlag = false;
    }
    // const horizontal = true;
    const TouchMe = !onPress ? View : TouchableOpacity;
    return (
      <View>
          <View style={styles.addGuestsMainContainer}>
            <TouchMe
                accessible={false}
                style={[
                styles.morebuttonContainer,
                { width: !width ? getWidthPercentage(94) : width }
                ]}
                onPress={onPress}
            >
                <Text
                style={styles.morebuttontitleText}
                accessibilityLabel={`${label} Field`}
                >
                {label}
                </Text>
                <View style={styles.morebuttoninnerContainer}>
                    <Text style={styles.morebuttonnullText}>{i18strings('calendarsPage.addGuests')}</Text>
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
            <TouchableOpacity onPress={infoPressed}>
                <Image
                    accessibilityLabel={i18strings('accessibility.removeBtn')}
                    source={images.detailsActivity}
                    style={styles.infoImage}
                />
            </TouchableOpacity>
           </View>
        <View style={styles.guestsList}>
            {emptyFlag ? null : (
                value.map(item => {
                return (
                    <View
                    style={styles.morebuttoncontentContainer}
                    key={
                        item.title ||
                        item.name ||
                        item.descriptionText ||
                        item.FullName
                    }
                    >
                    { workspaceID === item.id ?
                    <Image
                        accessibilityLabel={i18strings('accessibility.removeBtn')}
                        source={this.returnRSVPImage(rsvpValue)}
                        style={styles.statusImage}
                    />
                    :
                    <Image
                        accessibilityLabel={i18strings('accessibility.removeBtn')}
                        source={this.returnRSVPImage(item.statusCode)}
                        style={styles.statusImage}
                    />
                    }
                    <Text
                        style={styles.morebuttonactionText}
                        accessibilityLabel={`${accessibilityLabelInput} ${item.title ||
                        item.name ||
                        item.descriptionText}`}
                    >
                        {item.title ||
                        item.name ||
                        item.descriptionText ||
                        item.FullName}
                    </Text>
                    { owner === item.id ? null :
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
                    }
                    </View>
                );
                })
            )}
        </View>
    </View>
    );
  }
}
