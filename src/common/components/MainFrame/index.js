import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Image,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { navigatetoDashboard } from '../../../pages/Dashboard/actions';
import colors from '../../Colors';
import styles from './styles';

export default class MainFrame extends Component {
  static propTypes = {
    backgroundColor: PropTypes.string,
    isLoading: PropTypes.bool,
    currentScreenProps: PropTypes.any
  };

  static defaultProps = {
    backgroundColor: colors.white,
    isLoading: false
  };

  buttonPressed = button => {
    const { navigation } = this.props;
    navigation.navigate(button);
  };

  onHomePressed = () => {
    const { navigation } = this.props;
    console.log('this.props: ', this.props);
    navigation.dispatch(navigatetoDashboard());
  };

  renderMenuItem = (icon, title, onPress, textStyle) => {
    return (
      <TouchableOpacity
       style={styles.menuItem}
       onPress={onPress}
      >
        <Image source={icon} />
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    const SafeContainer = Platform.OS === 'android' ? View : SafeAreaView;
    const {
      children,
      backgroundColor
    } = this.props;
    return (
      <SafeContainer
        style={{
          flex: 1,
          backgroundColor
        }}
      >
        <StatusBar backgroundColor={colors.tealBlue} />
        {children}
      </SafeContainer>
    );
  }
}
