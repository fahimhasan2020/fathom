import React, { Component } from 'react';
import {
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  Platform
} from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import {
  getData,
  logException
} from '../../../../common/Helper';

import styles from './styles';
import images from '../../../../common/Images';
import colors from '../../../../common/Colors';
import { commonStyle as cs } from '../../../../common/styles';
import Orientation from 'react-native-orientation-locker';

export default class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showRetry: false,
      singleButton: false,
      showUpdatePopup: false,
      currentAppVersion: parseFloat(2.54),
      //flag: false
    };
  }

  componentDidMount = async () => {
    Orientation.lockToPortrait();
    setTimeout(() => {
      this.navigate();
    }, 2200);
  };

  navigate = async () => {
    try {
      const { navigation } = this.props;
        const value = await getData('flag');
        const user = await getData('USER');
        if (!user) {
          navigation.navigate('LoginPage');
        } else {
          navigation.navigate('HomePage');
        }
    } catch (err) {
      logException(`SplashPage / Navigate / ${err.message}`);
    }
  };

  render() {
    const { loading } = this.state;
    return (
      <ImageBackground source={images.splash} style={cs.container}>
        <View style={styles.splashContainer}>
          <Image style={styles.logoWhite} source={images.logoWhite} />
        </View>
        {!loading ? null : (
          <View style={styles.activityContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        )}
      </ImageBackground>
    );
  }
}
