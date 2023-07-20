
import React from 'react';
import { View, Text } from 'react-native';
import { PropTypes } from 'prop-types';
import AppIntroSlider from 'react-native-app-intro-slider';
import styles from './styles';
import { saveData } from '../../../../common/Helper';
import WalkThroughScreen1 from '../../components/WalkthroughScreen1';
import WalkThroughScreen2 from '../../components/WalkthroughScreen2';
import WalkThroughScreen3 from '../../components/WalkthroughScreen3';
import WalkThroughScreen4 from '../../components/WalkthroughScreen4';

const slides = [
  {
    key: 1,
  },
  {
    key: 2,
    val: true
  },
  {
    key: 3,
  },
  {
    key: 4,
  }
];
class SliderContainer extends React.Component {

  static propTypes = {
    navigation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      introScreenIndex: 0
    };
  }

  _renderNextButton = () => {
    const { introScreenIndex } = this.state;
    return (
      <View style={styles.nextButtonContainer}>
        <View style={introScreenIndex !== 1 ? styles.nextButton : styles.nextButton2}>
          <Text style={introScreenIndex !== 1 ? styles.nextText : styles.nextText2}>NEXT</Text>
        </View>
      </View>
    );
  }

  _renderSkipButton = () => {
    return (
      <View style={styles.skipButtonContainer}>
        <View style={styles.skipButton2}>
          <Text style={styles.skipText2}>SKIP</Text>
        </View>
      </View>
    );
  }

  _renderDoneButton = () => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.nextText}>Done</Text>
      </View>
    );
  }

  _renderItem = ({ item }) => {
    if (item.key === 1) {
      return (
        <WalkThroughScreen1 />
      );
    }
    else if (item.key === 2) {
      return (
        <WalkThroughScreen2 />
      );
    }
    else if (item.key === 3) {
      return (
        <WalkThroughScreen3 />
      );
    }
    else if (item.key === 4) {
      return (
        <WalkThroughScreen4 />
      );
    }
  }

  _onDone = () => {
    saveData('introFlag', 'true');
    this.props.navigation.navigate('HomePage');
  }

  changeScreenNumber = (index, lastIndex) => {
    this.setState({ introScreenIndex: index });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppIntroSlider
          renderItem={this._renderItem}
          data={slides}
          showSkipButton={true}
          onSlideChange={this.changeScreenNumber}
          renderNextButton={this._renderNextButton}
          renderSkipButton={this._renderSkipButton}
          keyExtractor={item => item.key.toString()}
          renderDoneButton={this._renderDoneButton}
          onDone={this._onDone}
        />
      </View>
    );
  }
}
export default SliderContainer;