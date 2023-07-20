
import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image
} from 'react-native';
import images from '../../../../common/Images';
import styles from './styles';

class WalkThroughScreen3 extends React.Component {

    renderCleanCamera = () => {
        return (
            <View
                style={styles.lightContainer}
            >
                <Text style={styles.title}> Clean That Camera</Text>
                <Text style={styles.bodyText}> Make sure to clean your lens before you start your shoot. Fingerprints and other dirt on your camera lens cause light streaks and blurry spots in your photos. Many of these are very difficult and expensive, if not impossible, to edit out. 

              </Text>
            </View>
        );
    }

    renderHorizontalLine = () => {
        return (
            <View style={styles.line}>
            </View>
        );
    }

    renderTurnUpVolume = () => {
        return (
            <View
                style={styles.fansContainer}
            >
                <Text style={styles.title}> Turn Up the Volume </Text>
                <Text style={styles.bodyText}>Since you’ll need to hold the camera still for each shot, you’ll want to be able to hear when the shot is completed. You’ll know it’s done when you hear two short camera “clicks” and see the Keep / Delete screen. If you move the camera too much or too soon it’ll be blurry.
                </Text>
            </View>

        );
    }

    renderRemoveDistortions = () => {
        return (
            <View
                style={styles.fansContainer}
            >
                <Text style={styles.title}> Turn Up the Volume </Text>
                <Text style={styles.bodyText}> Because you’ll need to hold still for each photo, turn up the volume so you know when each shot is complete! You should hear two short camera “clicks”. You’ll know it’s done when prompter to “Keep” or “Delete”. If you move the camera too soon, it’ll be blurry!
                </Text>
            </View>
        );
    }

    render() {
        return (
            <ImageBackground
                source={images.slider1Background}
                style={styles.backgroundImage}
            >
                {this.renderCleanCamera()}
                {this.renderHorizontalLine()}
                {this.renderTurnUpVolume()}
            </ImageBackground>
        );
    }
}

export default WalkThroughScreen3;
