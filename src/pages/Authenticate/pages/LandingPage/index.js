/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import { PropTypes } from 'prop-types';
import Button from '../../../../common/components/Button';
import { MenuButtons, SubMenuButtons } from '../../../../common/widgets';
import { i18strings } from '../../../../common/locales/i18n';
import { saveData } from '../../../../common/Helper';

import styles from './styles';
import ads from '../../../../common/navigation/AppDrawer/styles';
import images from '../../../../common/Images';
import { commonStyle as cs } from '../../../../common/styles';
import { ScrollView } from 'react-native-gesture-handler';
import Colors from '../../../../common/Colors';

export default class LandingPage extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      expandRegion: false,
    };
  }

  navigate = toPage => {
    const { navigation } = this.props;
    navigation.navigate(toPage);
  };

  onExpandRegion = () => {
    const { expandRegion } = this.state;
    this.setState({
      expandRegion: !expandRegion
    });
  };

  onSWitchEnvironment = async (ENV) => {
    saveData('ENV', ENV);
    this.onExpandRegion();
  };

  render() {
    const { expandRegion } = this.state;
    const accessibleFlag = true;
    return (
      <ImageBackground
        accessible={accessibleFlag}
        accessibilityLabel={i18strings('accessibility.landing')}
        source={images.splash}
        style={cs.container}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoWhite}
            source={images.logoWhite}
            accessible={accessibleFlag}
            accessibilityLabel={i18strings('accessibility.logo')}
          />
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            accessible={accessibleFlag}
            accessibilityLabel={i18strings('accessibility.loginBtn')}
            accessibilityComponentType="button"
            text={i18strings('landing.login')}
            style={cs.tealBlueBtn}
            textStyle={cs.tealBlueBtnText}
            onPress={() => this.navigate('LoginPage')}
          />
          <Button
            accessible={accessibleFlag}
            accessibilityLabel={i18strings('accessibility.createAccountBtn')}
            accessibilityComponentType="button"
            text={i18strings('landing.createAccount')}
            style={cs.buttonWhiteAlt}
            textStyle={cs.buttonTextWhite}
            onPress={() => this.navigate('SignupPage')}
          />
          {!expandRegion ? (
            <View style={{ backgroundColor: Colors.white, marginTop: 20, width: '88%' }}>
              <MenuButtons
                extraImage={images.expand}
                title={i18strings('menu.switch')}
                onPress={this.onExpandRegion}
                onExpand={this.onExpandRegion}
                icon={images.icAssignmentMenu}
                accessible={accessibleFlag}
                accessibilityLabel={i18strings('accessibility.logoutSidemenu')}
              />
            </View>
            ) : (
              <ScrollView style={[ads.expandedRowsContainer, { width: '88%', marginTop: 20 }]}>
                <MenuButtons
                  extraImage={images.reduce}
                  title={i18strings('menu.switch')}
                  onPress={this.onExpandRegion}
                  onExpand={this.onExpandRegion}
                  icon={images.icAssignmentMenu}
                  accessible={accessibleFlag}
                  accessibilityLabel={i18strings('accessibility.logoutSidemenu')}
                />
                <SubMenuButtons
                  title={i18strings('menu.dev')}
                  onPress={() => this.onSWitchEnvironment('DEV')}
                  icon={images.icAssignmentMenu}
                  accessible={accessibleFlag}
                  accessibilityLabel={i18strings('accessibility.logoutSidemenu')}
                />
                <SubMenuButtons
                  title={i18strings('menu.test')}
                  onPress={() => this.onSWitchEnvironment('TEST')}
                  icon={images.icAssignmentMenu}
                  accessible={accessibleFlag}
                  accessibilityLabel={i18strings('accessibility.logoutSidemenu')}
                />
                <SubMenuButtons
                  title={i18strings('menu.sb')}
                  onPress={() => this.onSWitchEnvironment('SB')}
                  icon={images.icAssignmentMenu}
                  accessible={accessibleFlag}
                  accessibilityLabel={i18strings('accessibility.logoutSidemenu')}
                />
                <SubMenuButtons
                  title={i18strings('menu.sb2')}
                  onPress={() => this.onSWitchEnvironment('SB2')}
                  icon={images.icAssignmentMenu}
                  accessible={accessibleFlag}
                  accessibilityLabel={i18strings('accessibility.logoutSidemenu')}
                />
                <SubMenuButtons
                  title={i18strings('menu.staging')}
                  onPress={() => this.onSWitchEnvironment('STAGING')}
                  icon={images.icAssignmentMenu}
                  accessible={accessibleFlag}
                  accessibilityLabel={i18strings('accessibility.logoutSidemenu')}
                />
                <SubMenuButtons
                  title={i18strings('menu.prod')}
                  onPress={() => this.onSWitchEnvironment('PROD')}
                  icon={images.icAssignmentMenu}
                  accessible={accessibleFlag}
                  accessibilityLabel={i18strings('accessibility.logoutSidemenu')}
                />
              </ScrollView>
            )}
        </View>
      </ImageBackground>
    );
  }
}
