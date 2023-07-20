import {
  View,
} from 'react-native';
import React, {Component} from 'react';
import styles from './styles.js';

class GridView extends Component {
  render(){
    const { showRed } = this.props;
    return (
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.grayBox} />
          <View style={styles.grayBox} />
          <View style={styles.grayBox} />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.grayBox} />
          <View style={showRed ? styles.redBox : styles.grayBox} />
          <View style={styles.grayBox} />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.grayBox} />
          <View style={styles.grayBox} />
          <View style={styles.grayBox} />
        </View>
      </View>
    );
  }
}

export default GridView;
