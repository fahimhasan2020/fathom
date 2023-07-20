
import styles from './styles';
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import images from '../../../../common/Images';

class WalkThroughScreen1 extends React.Component {
    renderPageTitle = () => {
        return (
            <View
                style={styles.lightContainer}
            >
                <Text style={styles.pagetitle}> Tips and Tricks </Text>
            </View>
        );
    }

    renderHorizontalLine = () => {
        return (
            <View style={styles.line} />
        );
    }

    renderTurnOnLights = () => {
        return (
            <View
                style={styles.fansContainer}
            >
                <Text style={styles.title}> All Lights ON</Text>
                <Text style={styles.bodyText}> Turn ON all the lights and lamps. This will make your space appear more inviting and add life to your photos. If there are matching lamps and only one works, leave them both OFF
              </Text>
            </View>
        );
    }

    renderTurnOffFans = () => {
        return (
            <View
                style={styles.lightContainer}
            >
                <Text style={styles.title}> Turn OFF ALL Fans </Text>
                <Text style={styles.bodyText}> Make sure all fans are OFF and completely still before taking your shot. Moving fans will create a blur in your photos and distract from the room.
                </Text>
            </View>

        );
    }

    renderNaturalLight = () => {
        return (
            <View
                style={styles.distortationContainer}
            >
                <Text style={styles.title}>More Natural Light</Text>
                <Text style={styles.bodyText}>Open all curtains and shades to let in as much natural light as possible. Blinds and shutters should be opened with the slats pointed slightly downward.
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
                {this.renderPageTitle()}
                {this.renderTurnOnLights()}
                {this.renderHorizontalLine()}
                {this.renderNaturalLight()}
            </ImageBackground>
        );
    }

}
export default WalkThroughScreen1;
