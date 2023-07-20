import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Colors from '../../Colors'
const Ellips = () => {
    return (
        <View style={{ flex: 1, position: 'absolute', top: 0, left: 0,right:0,bottom:0, zIndex: 0 }}>
            <View style={styles.blurView}></View>
            <View style={styles.blurViewTwo}></View>
            <View style={styles.blurViewThree}></View>
        </View>
    )
}

export default Ellips

const styles = StyleSheet.create({
    blurView: {
        height: 150, width: 150, borderRadius: 200, backgroundColor: Colors.blue, position: 'absolute', top: 200, left: -80,
        elevation: 10
    },
    blurViewTwo: {
        height: 150, width: 150, borderRadius: 200, backgroundColor: Colors.blue, position: 'absolute', top: 50, right: -50,
        elevation: 10
    },
    blurViewThree: {
        height: 150, width: 150, borderRadius: 200, backgroundColor: Colors.blue, position: 'absolute', bottom: 0, right: -80,
        elevation: 10
    },
})