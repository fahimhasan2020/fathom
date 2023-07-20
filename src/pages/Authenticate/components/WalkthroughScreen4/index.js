
import styles from './styles';
import React from 'react';
import { View, Text, ImageBackground, Platform } from 'react-native';
import images from '../../../../common/Images';

class WalkThroughScreen4 extends React.Component {

    renderHorizontalLine = () => {
        return (
            <View style={styles.line}>
            </View>
        );
    }

    renderHappyShooting = () => {
        return (
            <View
                style={styles.fansContainer}
            >
                <Text style={styles.title}>Happy Shooting!</Text>
                <Text style={styles.bodyText}>These tips are always available to review in the App menu.
                </Text>
            </View>
        );
    }

    renderShootAlone = () => {
        return(
        <View
            style={Platform.OS === "android" ?  styles.lightContainer : styles.iOSLightContainer}
        >
            <Text style={styles.title}>Shoot Alone</Text>
            <Text style={styles.bodyText}>
            You probably want to schedule a time when the homeowner is not around to take your photos. Even though this app will give you professional
             quality photos it may make some homeowners uncomfortable to see you taking photos of their home with your phone. We are not suggesting you
              hide anything, just reduce the potential for unnecessary stress at an already stressful time.

            </Text>
        </View>
        );
    }

    render() {
        return (
            <ImageBackground
                source={images.slider1Background}
                style={styles.image}
            >
                {this.renderShootAlone()}
                {this.renderHorizontalLine()}
                {this.renderHappyShooting()}

            </ImageBackground>
        );
    }

}
export default WalkThroughScreen4;
