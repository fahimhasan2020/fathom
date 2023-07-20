
import styles from './styles';
import React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import images from '../../../../common/Images';

class WalkThroughScreen2 extends React.Component {

    renderHorizontalLine = () => {
        return (
            <View style={styles.line}>
            </View>
        );
    }


    renderRemoveDistortions = () => {
        return (
            <View
                style={styles.fansContainer}
            >
                <Text style={styles.title}>Remove Evidence of Pets</Text>
                <Text style={styles.bodyText}> Remove all evidence of pets such as beds, kennels, food, bowls, toys, etc. We all love our pets but for the photos they have to go.
                </Text>
            </View>
        );
    }

    renderTurnOffFans = () => {
        return(
        <View
            style={styles.lightContainer}
        >
            <Text style={styles.title}>Turn OFF ALL Fans</Text>
            <Text style={styles.bodyText}> Make sure all fans are OFF and completely still before taking your shot. Moving fans will create a blur in your photos and distract from the room.
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
                {this.renderTurnOffFans()}
                {this.renderHorizontalLine()}
                {this.renderRemoveDistortions()}

            </ImageBackground>
        );
    }

}
export default WalkThroughScreen2;
