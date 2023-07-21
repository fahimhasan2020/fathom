import React, { Component, useState, useEffect, useRef } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { StyleSheet, Text, View, StatusBar, Vibration, Image, ActivityIndicator, TouchableOpacity, Platform } from 'react-native'
import styles from './styles';
import { getData, saveData } from '../../../../common/Helper';
import images from '../../../../common/Images';
import GridViewComponent from '../../../Dashboard/components/GridView';
import { NavigationEvents, useNavigation,useRoute  } from '@react-navigation/native';
import {
  SensorTypes,
  accelerometer,
  setUpdateIntervalForType,
} from 'react-native-sensors';
import KeepAwake from 'react-native-keep-awake';
import Orientation from 'react-native-orientation-locker';
setUpdateIntervalForType(SensorTypes.accelerometer, 700);
const CameraPage = () => {
  const devices = useCameraDevices('wide-angle-camera');
  const route = useRoute();
  const navigation = useNavigation();
  const device = devices.back;
  const cameraRef = useRef(null);
  const [dataUri, setDataUri] = useState([]);
  const [lensTypes, setLensTypes] = useState([]);
  const [showRed, setShowRed] = useState(false);
  const [disableViberate, setDisableViberate] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [selectedLens, setSelectedLens] = useState(null);
  const [selectedLenseIndex, setSelectedLensIndex] = useState(0);
  const [btnEnabled, setBtnEnabled] = useState(false);
  const [exposureValue, setExposureValue] = useState(-1);
  const [isSnapping, setIsSnapping] = useState(false);
  const [orientation, setOrientation] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  const [timerCount, setTimerCount] = useState(3);
  if (device == null) return (<View></View>);


  const deviceOrientationListener = (orientationType) => {
    let orientationval = orientation;
    switch (orientationType) {
      case 'PORTRAIT':
        orientationval = 'portrait';
        break;
      case 'LANDSCAPE-LEFT':
        orientationval = 'landscapeRight';
        break;
      case 'LANDSCAPE-RIGHT':
        orientationval = 'landscapeLeft';
        break;
      case 'PORTRAIT-UPSIDEDOWN':
        orientationval = 'portraitUpsideDown';
        break;
    }
    setOrientation(orientationval);
  };

  const handleDidFocus = async () => {
    console.log('did focus called!');
    Orientation.lockToPortrait();
    resetStates();
    KeepAwake.activate();
    this.subscription = accelerometer.subscribe(({ x, y, z }) => {
      this.checkDeviceLevels(x.toFixed(2), y.toFixed(2), z.toFixed(2));
    });
    let data = await getData('PROPERTIES');
    const lastCam = await getData('LASTCAM');
    const lastCamIndex = await getData('LASTCAMINDEX');
    if (lastCam) {

      setSelectedLens(lastCam);
      setSelectedLensIndex(lastCamIndex);
    }
    const propertAddress = route.params.property;
    if (data) {
      data = JSON.parse(data);
      const selectedProperty = data.find(
        (item) => item.title === propertAddress,
      );
      if (selectedProperty) {
        setBtnEnabled(true)
      } else {
        setBtnEnabled(false)
      }
    }
  };

  const handleWillBlur = () => {
    console.log('did blur called!');
    KeepAwake.deactivate();
    Vibration.cancel();
    if (!this.unsubscribe) {
      this.subscription.unsubscribe();
    }
  };

  const resetStates = () => {
    setDataUri([]);
    setIsSnapping(false);
    setExposureValue(-1);
  };

  const checkDeviceLevels = (x, y, z) => {
    if (Platform.OS === 'ios') {
      if ((y > -0.02 && y < 0.02) || (x < 0.02 && x > -0.02)) {
        if (!showRed) {
          if (!isSnapping && !disableViberate) {
            Vibration.vibrate();
            setDisableViberate(true)
          }
          setShowRed(true);
        }
      } else {
        console.log('viberate false');
        setShowRed(false);
        if ((y < -0.05 || y > 0.05) && (x > 0.05 || x < -0.05)) {
          setDisableViberate(false)
        }
      }
    } else {
      if (
        (y < 0.2 && y > -0.1 && x < 10.0 && x > 9.6 && z > -0.5) ||
        (y < 0.2 && y > -0.1 && x > -10.0 && x < -9.6 && z > -0.5) ||
        (x < 0.5 && x > -0.5 && y < 9.9 && y > 9.0) ||
        (z < 9.9 && z > 9.7) ||
        (z > -9.9 && z < -9.5)
      ) {
        if (!showRed) {
          if (!isSnapping) {
            Vibration.vibrate();
          }
          setShowRed(true);
        }
      } else {
        setShowRed(false);
      }
    }
  };

  const toggleGrid = () => {
    setShowGrid(!showGrid);
  };

  const takePicture = async () => {
    console.log('Started:');
    setShowTimer(true);
    setTimerCount(3)
    const intervalId = setInterval(() => {
      setTimerCount(prevState => prevState - 1);
      if (timerCount === 0) {
        clearInterval(intervalId);
        setShowTimer(false);
      }
    }, 1000);

    setTimeout(async () => {  
      console.log('StaSnappingted:');
      const projectId = route.params.projectId;
      setIsSnapping(true);
      const data = [];
      let options = {};
      if (cameraRef.current) {
        if (Platform.OS === 'ios') {
          setTimerCount(0);
          setShowTimer(false);
          options = {
            base64: true,
            quality: 0.5,
            exposure: 1,
            orientation: orientation,
          };
          let imagearray = await cameraRef.current.takePhoto({
            flash: 'on',
            base64: true,
            quality: 0.5,
            exposure: 0,
          });
          console.log('Now checked:',imagearray);
          options = {
            base64: true,
            quality: 0.5,
            exposure: 0,
            orientation: orientation,
          };

          let imageobj = await cameraRef.current.takePhoto({
            flash: 'on',
            base64: true,
            quality: 0.5,
            exposure: 0,
          });
          data.push(imageobj.uri);

          for (let image of imagearray) {
            data.push(image.uri);
          }
        } else {
          options = {
            quality: 0.5,
          };
          let imagearray = await cameraRef.current.takePhoto({base64: true,
            quality: 0.5,
          });
          console.log('grabbaa',imagearray);
          data.push(imagearray.path);
          // for (let image of imagearray.pictures) {
          //   data.push(image.uri);
          // }
         await setTimerCount(0);
         await  setShowTimer(false);
        }
        const propertAddress = route.params.property;
        const googleplaceId = route.params.placeId;
        navigation.navigate('ShowCapturedImagePage', {
          imageURL: data,
          property: propertAddress,
          placeId: googleplaceId,
          projectId: projectId,
          onBack: () => {
            setBtnEnabled(true);
          },
        });
      }
     
    }, 3000);
  };

  const donePressed = () => {
    const propertAddress = route.params.property;
    const placeId = route.params.placeId;
    const projectId = route.params.projectId;
    console.log('cameraPage', projectId);
    // navigation.goBack();
    navigation.navigate('ViewProjectPage', {
      property: propertAddress,
      placeId: placeId,
      projectId: projectId,
    });
  };

  const renderOpaquBar = (isBottom) => {
    return (
      <View
        style={isBottom ? styles.bottomBarContainer : styles.topBarContainer}
      />
    );
  };

  const renderSnapButton = () => {
    return (
      <TouchableOpacity
        onPress={takePicture}
        style={styles.snapButtonContainer}>
        <Image source={images.snapButton} />
      </TouchableOpacity>
    );
  };

  const renderDoneButton = () => {
    return (
      <TouchableOpacity
        onPress={donePressed}
        style={[
          styles.doneButtonAlt,
        ]}>
        <Text style={styles.doneTextAlt}>Done</Text>
      </TouchableOpacity>
    );
  };

  renderGridButton = () => {
    return (
      <TouchableOpacity onPress={toggleGrid} style={styles.gridButton}>
        <Image source={showGrid ? images.gridIcon : images.withoutGridIcon} />
      </TouchableOpacity>
    );
  };

  renderCameraOptions = () => {
    return (
      <View style={styles.cameraTypesContainer}>
        <TouchableOpacity onPress={changeCamera}>
          <Image
            style={{ width: 30, height: 30 }}
            source={images.nextCameraIcon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const changeCamera = () => {
    let index = selectedLensIndex + 1;
    if (selectedLensIndex === lensTypes.length - 1) {
      index = 0;
    }
    saveData('LASTCAM', lensTypes[index].id);
    saveData('LASTCAMINDEX', index);
    setSelectedLens(lensTypes[index].id);
    setSelectedLenseIndex(index)
  };




  return (
    <View style={styles.mainContainer}>
      <StatusBar hidden={true} />
      <Camera
        ref={cameraRef}
        style={styles.preview}
        device={device}
        photo={true}
        isActive={true}
      />
      {showTimer ? <Text style={{ position: 'absolute', top: '48%', left: '45%', fontSize: 100, color: 'white', fontWeight: 'bold' }}>{timerCount}</Text> : null}
      {!showGrid ? null : <GridViewComponent showRed={showRed} />}
      {renderOpaquBar(false)}
      {renderOpaquBar(true)}
      {renderSnapButton()}
      {renderDoneButton()}
      {renderGridButton()}
      {renderCameraOptions()}
    </View>

  )
}

export default CameraPage