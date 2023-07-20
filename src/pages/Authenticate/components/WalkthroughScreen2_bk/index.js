
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
} from 'react-native';
import images from '../../../../common/Images';
import styles from './styles';

class WalkThroughScreen2 extends React.Component {

  renderImage = () => {
    return (
      <View
        style={styles.imageContainer}
      >
        <ImageBackground
          source={images.textBackgroundImage}
          style={styles.image}
        >
          <Text
            style={styles.tollTipText}> Lorem Ipsum Dolor Amet, Consectetur
            Adipiscing Elit, Sed Do Tempo.
          </Text>
        </ImageBackground>
      </View>
    );
  }

  renderText = () => {
    return (
      <View
        style={styles.textContainer}
      >
        <Text style={styles.bodyText}> Lorem Ipsum Dolor Amet, Consectetur
        Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt.
       </Text>
      </View>

    );
  }

  render() {
    return (
      <View
        style={styles.mainContainer}>
        <ImageBackground
          source={images.mapBackgroundImage}
          style={styles.backgroundImage}
        >
          {this.renderImage()}
          {this.renderText()}
        </ImageBackground>
      </View>
    );
  }
}

export default WalkThroughScreen2;
