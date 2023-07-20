import React from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  Platform,
  Keyboard,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import MainFrame from '../../../../common/components/MainFrame';

import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { LoginManager, Profile } from "react-native-fbsdk-next";
import FindInput from '../../../../common/components/FindInput';
import getAuthToken from '../../api/GetAuthTokenService';
import { getUserInfo, getAuth0Token } from '../../api/GetUserInfoService';
import styles from './styles';
import { saveData, getData } from '../../../../common/Helper';
import images from '../../../../common/Images';
import Entypo from "react-native-vector-icons/Entypo"

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      accessToken: '',
      loading: false,
      emailValidated: false,
      passwordValidated: false,
      showPassword: true, userinfo: {},
      currentUser: {}
    };
  }

  loginWithFacebook = () => {
    console.log('called auto');
    LoginManager.logInWithPermissions(["public_profile"]).then(
      (result) => {
        console.log(result);
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          // const currentProfile = Profile.getCurrentProfile().then(
          //   (currentProfile)=> {
          //     if (currentProfile) {
          //       console.log(currentProfile);
          //     }
          //   }
          // );
        }
      },
      (error) => {
        console.log("Login fail with error: " + error);
      }
    );
  }

  renderLogoImage = () => {
    return (
      <View style={styles.imageContainer}>
        <Image source={images.realtyProLogo} style={styles.logoImageStyles} />
      </View>
    );
  };

  loginWithGoogle = async () => {
    try {
      await GoogleSignin.configure({
        webClientId: '129996174650-etl3rai21fql983dpmm5f761evlm05bl.apps.googleusercontent.com',
        forceCodeForRefreshToken: true,
      });

      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo });
      if (userInfo.hasOwnProperty('idToken')) {
        console.log(userInfo);
      }

    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('error cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('error progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('error service unavailable');
      } else {
        console.log(error);
      }
    }

  }


  renderEmailContainer = () => {
    const { emailError, email } = this.state;
    return (
      <View style={styles.emailContainer}>
        <FindInput
          iconName="email"
          placeholder="Email"
          clearTextOnFocus={false}
          error={emailError}
          onChange={(emailValue) => this.setState({ email: emailValue })}
          value={email}
          keyboardType="email-address"
          maxLength={100}
        />
      </View>
    );
  };

  validateEmail = () => {
    this.setState({ loading: true });
    const { email } = this.state;
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email !== '') {
      if (regex.test(email) === true) {
        this.setState({
          emailError: '',
          emailValidated: true,
        });
        this.onPressLogin();
      } else {
        this.setState({
          emailError: 'Email format is Invalid',
          emailValidated: false,
        });
      }
    } else {
      this.setState({
        emailError: 'Please enter email',
        emailValidated: false,
        loading: false,
      });
    }
  };

  validatePassword = () => {
    const { password } = this.state;
    if (password === '') {
      this.setState({
        passwordError: 'Please enter password',
        passwordValidated: false,
      });
    } else {
      this.setState({
        passwordError: '',
        passwordValidated: true,
      });
    }
  };

  renderPasswordContainer = () => {
    const { passwordError, password, showPassword } = this.state;
    return (
      <View style={styles.emailContainer}>
        <FindInput
          iconName="lock-outline"
          placeholder="*******"
          secureTextEntry={showPassword}
          icon={showPassword ? images.eyeSlashIcon : images.viewIcon}
          onPressIcon={this.onPressEyeIcon}
          clearTextOnFocus={false}
          error={passwordError}
          onChange={(passwordValue) => this.setState({ password: passwordValue })}
          value={password}
          onBlur={(e) => this.validatePassword()}
        />
      </View>
    );
  };

  onPressEyeIcon = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  renderLoading = () => {
    const { loading } = this.state;
    if (!loading) {
      return null;
    }
    const color = 'white';
    return (
      <TouchableOpacity
        style={!loading ? styles.loginButton : styles.loginButtonWithOpacity}
        disabled={loading}>
        <ActivityIndicator size="small" color={color} />
      </TouchableOpacity>
    );
  };

  renderButtonText = () => {
    const { loading } = this.state;
    if (loading) {
      return null;
    }
    return (
      <TouchableOpacity style={styles.loginButton} onPress={this.validateEmail}>
        <Text style={styles.title}>LOGIN</Text>
      </TouchableOpacity>
    );
  };

  renderLoginButton = () => {
    return (
      <View style={styles.buttonContainer}>
        {this.renderLoading()}
        {this.renderButtonText()}
      </View>
    );
  };

  renderLoginBackgoundImage = () => {
    return (
      <View style={styles.loginBackgroundContainer}>
        <Image
          source={images.logoinBackground}
          style={styles.loginBackgroundImage}
        />
      </View>
    );
  };
  onPressLogin = async () => {
    try {
      const { email, password } = this.state;
      this.setState({ loading: true });
      const credentials = await getAuth0Token(email, password);
      console.log('credentials: ', credentials);
      if (credentials && credentials.id_token) {
        saveData('id_token', credentials.id_token);
        const getAuthTokenResponse = await getAuthToken(
          email,
          credentials.id_token,
        );
        console.log('getAuthTokenResponse: ', getAuthTokenResponse);
        let token = await getAuthTokenResponse.text();
        console.log('token: ', token);
        token = token.replace(/['"]+/g, '');
        // if (token) {
        const getUserInfoResponse = await getUserInfo(token);
        console.log('getUserInfoResponse: ', getUserInfoResponse);
        getUserInfoResponse.userEmail = email;
        saveData('USER', JSON.stringify(getUserInfoResponse));
        this.setState({ loading: false });
        const introFlag = await getData('introFlag');
        if (introFlag === true) {
          this.props.navigation.navigate('HomePage');
        } else {
          this.props.navigation.navigate('IntroPage');
        }
        // }
      } else {
        this.setState({
          passwordError: 'You have entered an invalid email or password',
          passwordValidated: false,
          loading: false,
        });
      }
    } catch (err) {
      console.log('err: ', err);
      this.setState({ loading: false });
    }
  };

  render(){
    return (
      <MainFrame>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <KeyboardAvoidingView
          style={{ backgroundColor: 'rgba(242,242,242,0.9)', flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {this.renderLoginBackgoundImage()}
          {this.renderLogoImage()}
          <View style={styles.infoContainer}>
            <Text style={{ color: '#525354', fontWeight: 'bold' }}>
              To login, you must use the account credentials of IntelliAgent
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.loginContainer}>
              {this.renderEmailContainer()}
              {this.renderPasswordContainer()}
              {this.renderLoginButton()}
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.socialContainer, { marginBottom: 30, marginTop: 10 }]}>
            <View style={{ width: 85, height: 1, backgroundColor: '#ccc', marginTop: 10, marginRight: 5 }}></View>
            <Text style={{ color: '#3d3d3d' }}>or continue with</Text>
            <View style={{ width: 85, height: 1, backgroundColor: '#ccc', marginTop: 10, marginLeft: 5 }}></View>
          </View>
          <View style={[styles.socialContainer]}>
            <Pressable onPress={() => { this.loginWithGoogle() }} style={{ marginRight: 10, backgroundColor: 'white', elevation: 10, borderRadius: 30, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}><Image source={require('../../../../common/assets/img/google.png')} style={{ height: 20, width: 20 }} /></Pressable>
            {/* <Pressable onPress={()=>{}} style={{ marginRight: 10, backgroundColor: 'white', elevation: 10, borderRadius: 30, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}><AntDesign color="black" name="apple-o" size={30} /></Pressable> */}
            <Pressable onPress={() => { this.loginWithFacebook() }} style={{ marginRight: 10, backgroundColor: 'white', elevation: 10, borderRadius: 30, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}><Entypo color="#3b5998" name="facebook-with-circle" size={30} /></Pressable>
          </View>
        </KeyboardAvoidingView>
      </MainFrame>
    );
  }
}
