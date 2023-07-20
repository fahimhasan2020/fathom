import React, { Component } from 'react';
import { Image, ScrollView, View, TouchableOpacity, Alert, Text, Modal, Linking } from 'react-native';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { navigatetoDashboard } from '../../../pages/Dashboard/actions';
import colors from '../../Colors';
import images from '../../Images';
import MainFrame from '../../components/MainFrame';
import { MenuButtons } from '../../widgets';
import { i18strings } from '../../locales/i18n';
import { removeData } from '../../../common/Helper';
import ads from './styles';

class AppDrawer extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      expand: false,
      expandRegion: false,
      nextEnv: '',
      modalVisible: false
    };
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  onButtonPress = async (button) => {
    const { navigation } = this.props;
    if (button.toString() === 'HomePage') {
      navigation.closeDrawer();
      navigation.navigate(button);
    } else if (button.toString() === 'Logout') {
      this.onPressLogout();
    } else if (button.toString() === 'ContactPage')  {
      navigation.closeDrawer();
      navigation.navigate(button);
    }
    else if (button.toString() === 'PrivacyPage')  {
      navigation.closeDrawer();
      navigation.navigate(button)
    }
    else {
      navigation.closeDrawer();
      navigation.navigate(button);
    }

     // navigation.navigate(button);
      // const navigateAction = NavigationActions.navigate({
      //   routeName: button,
      //   action: NavigationActions.navigate({ routeName: button }),
      // });
      // navigation.dispatch(navigateAction);
   // }
  };

  onPressLogout = () => {
    this.setState({ modalVisible: true });
  }

  onPressOK = async () => {
    this.setState({ modalVisible: false });
    await removeData('USER');
    this.props.navigation.navigate('LoginPage');
  }

  onExpand = () => {
    const { expand } = this.state;
    this.setState({
      expand: !expand
    });
  };

  onExpandRegion = () => {
    const { expandRegion } = this.state;
    this.setState({
      expandRegion: !expandRegion
    });
  };

  onLogoPressed = () => {
    const { navigation } = this.props;
    navigation.dispatch(navigatetoDashboard());
  };

  onPressCancel = () => {
    this.setState({ modalVisible: false });
    const { navigation } = this.props;
    navigation.closeDrawer();
  }

  renderModal = () => {
    const { modalVisible } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!modalVisible);
        }}
      >
        <View style={ads.mainMoadl}>
          <View style={ads.modalSubView}>
            <View style={ads.titleViewStyle}><Text style={ads.modalTitleText}>Logout</Text></View>
            <View style={ads.separator} />
            <Text style={ads.subtitleText}>Are you sure you want to Logout? </Text>
            <View style={ads.modalButtonContainer}>
              <TouchableOpacity
               style={ads.modalButton}
               onPress={() => this.onPressCancel()}
               >
                <Text style={ads.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
               style={ads.modalButton}
               onPress={() => this.onPressOK()}
              >
                <Text style={ads.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const accessibleFlag = true;
     const { modalVisible } = this.state;
    return (
      <MainFrame backgroundColor={colors.tealBlue}>
        <ScrollView style={ads.mainScrollContainer}>
          <TouchableOpacity
            onPress={this.onPressCancel}
            style={ads.cancelContainer}
          >
            <Image
              
              resizeMode="contain"
              style={ads.cancelIconStyle}
              source={images.cancelIcon}
            />
          </TouchableOpacity>
          <View
            style={ads.logoContainer}
          >
            <Image
              
              resizeMode="contain"
              style={ads.logoStyle}
              source={images.realtyProLogo}
            />
          </View>
          <Text style={ads.versionNumbers}>Version 1.0</Text>
          <View style={ads.buttonsContainer}>
              <TouchableOpacity
                onPress={() => this.onButtonPress('HomePage')}
                style={ads.subView}
              >
                <Image
                  style={ads.iconStyle}
                  source={images.projectsIcon}
                />
                <Text style={ads.titleText}>My Projects</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onButtonPress('PlayVideoPage')}
                style={ads.subView}
              >
                <Image
                  style={ads.iconStyle}
                  source={images.videoIcon}
                />
                <Text style={ads.titleText}>Taking Good Photos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onButtonPress('IntroPage')} 
                style={ads.subView}
              >
                <Image
                  style={ads.iconStyle}
                  source={images.tipsIcon}
                />
                <Text style={ads.titleText}>Tips & Tricks</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.onButtonPress('ContactPage')}
                style={ads.subView}
              >
                <Image
                  style={ads.iconStyle}
                  source={images.supportIcon}
                />
                <Text style={ads.titleText}>Support</Text>
              </TouchableOpacity>
              <TouchableOpacity
               onPress={() => this.onButtonPress('PrivacyPage')}
                style={ads.subView}
              >
                <Image
                  style={ads.iconStyle}
                  source={images.privacyIcon}
                />
                <Text style={ads.titleText}>Privacy Policy</Text>
              </TouchableOpacity>
             
          </View>
        </ScrollView>
        <TouchableOpacity
                onPress={() => this.onButtonPress('Logout')}
                style={ads.subViews}
              >
                <Image
                  style={ads.iconStyle}
                  source={images.logoutIcon}
                />
                <Text style={ads.titleText}>Logout</Text>
              </TouchableOpacity>
        
        {modalVisible ? this.renderModal() : null}
      </MainFrame>
    );
  }
}

const mapStateToProps = ({ appState, loginState, currentUser }) => {
  const { page } = appState;
  const { user } = currentUser;
  const { authToken } = loginState;
  return { page, user, authToken };
};
export default connect(
  mapStateToProps,
  null
)(AppDrawer);
