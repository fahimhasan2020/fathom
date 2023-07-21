import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  PermissionsAndroid,
  Platform,
  StatusBar,
} from 'react-native';
import styles from './styles';
// import CameraRoll from '@react-native-community/cameraroll';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {getData, saveData} from '../../../../common/Helper';
import { NavigationEvents} from '@react-navigation/native';;
import Orientation from 'react-native-orientation-locker';
import images from '../../../../common/Images';
import moment from 'moment';

var RNFS = require('react-native-fs');

class ShowCapturedImagePage extends React.Component {
  constructor(props) {
    super(props);
    const dirHome = Platform.select({
      ios: `${RNFS.DocumentDirectoryPath}/Pictures`,
      android: `${RNFS.ExternalStorageDirectoryPath}/Pictures`,
    });
    const dirPictures = `${dirHome}/Fathom`;
    this.state = {
      imagePath: '',
      listData: [],
      albumPhoto: '',
      rotateImage: false,
      baseimgpath: null,
      dirPictures: dirPictures,
    };
  }

  handleDidFocus = async () => {
    Orientation.unlockAllOrientations();
    const capturedImages = this.props.route.params.imageURL;
    this.setState({imagePath: capturedImages[0]});
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    if (Platform.OS === 'android') {
      const baseimgpath = await getData('BASEIMAGEPATH');
      if (baseimgpath) {
        this.setState({
          baseimgpath: baseimgpath,
        });
      }
      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    }

    await this.getBasePath();
  };

  handleWillBlur = () => {
    console.log('handel will blur called');
  };

  onPressDeleteButton = () => {
    const onBack = this.props.route.params.onBack;
    if (onBack) {
      onBack();
    }
    setTimeout(() => {
      this.props.navigation.goBack();
    }, 1000);
  };

  getBasePath = async () => {
    let baseimgpath;
    await CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
      groupTypes: 'Album',
      groupName: 'Realty Pro Shots',
    })
      .then((r) => {
        let imgpath = r.edges[0].node.image.uri;
        imgpath = imgpath.substring(0, imgpath.lastIndexOf('/'));
        saveData('BASEIMAGEPATH', imgpath);
        this.setState({baseimgpath: imgpath});
        baseimgpath = imgpath;
      })
      .catch((err) => {
        const {imagePath} = this.state;
        const newImage = CameraRoll.save(imagePath.toString(), {
          type: 'photo',
          album: 'Realty Pro Shots',
        });
        console.log('basepath error: ', err);
      });
    return baseimgpath;
  };

  saveImage = async (filePath) => {
    try {
      // set new image name and filepath
      let filename = filePath.toString();
      filename = filename.substring(
        filename.lastIndexOf('/') + 1,
        filename.length,
      );
      const newFilepath = `${dirPictures}/${filename}`;
      // move and save image to new filepath
      const imageMoved = await this.moveAttachment(filePath, newFilepath);
      return newFilepath;
    } catch (error) {
      console.log(error);
    }
  };

  moveAttachment = async (filePath, newFilepath) => {
    return new Promise((resolve, reject) => {
      RNFS.mkdir(dirPictures)
        .then(() => {
          RNFS.moveFile(filePath, newFilepath)
            .then(() => {
              resolve(true);
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  onPressKeepButton = async () => {
    const {navigation} = this.props;
    const projectId = this.props.route.params.projectId;
    console.log('showImageScreen', projectId);
    const capturedImages = this.props.route.params.imageURL;
    const albumtitle = this.props.route.params.property;
    const idOfPlace = this.props.route.params.placeId;
    let fileNames = [];
    //this part has to be done
    // console.log('idOfGoogle Places: ', idOfPlace);
    const name = 'Realty Pro Shots';
    let imagesarray = [];
    let {baseimgpath, dirPictures} = this.state;
    try {
      await Promise.all(
        capturedImages.map(async (image) => {
          //this.saveImage(img);
          let filename = image.toString();
          filename = filename.substring(
            filename.lastIndexOf('/') + 1,
            filename.length,
          );
          fileNames = filename;
          const newImage = await CameraRoll.save(image.toString(), {
            type: 'photo',
            album: name,
          });
          if (Platform.OS === 'android') {
            if (!baseimgpath) {
              baseimgpath = await this.getBasePath();
            }
            imagesarray.push(`${baseimgpath}/${filename}`);
          } else {
            imagesarray.push(`${newImage}/${filename}`);
          }
          //imagesarray.push(image.toString());
        }),
      );

      let properties = await getData('PROPERTIES');
      properties = properties ? JSON.parse(properties) : [];
      const propertyIndex = properties.findIndex(
        (property) => property.projectId == projectId,
      );
      if (propertyIndex >= 0) {
        let currentImages = properties[propertyIndex].propertyPic;
        currentImages.push(imagesarray);
        properties[propertyIndex].propertyPic = currentImages;
      } else {
        properties.push({
          projectId: projectId,
          googlePlaceId: idOfPlace,
          id: properties.length,
          title: albumtitle,
          body: '',
          status: 'Not Submitted',
          propertyPic: [imagesarray],
        });
      }
      await saveData('PROPERTIES', JSON.stringify(properties));
      const onBack = this.props.route.params.onBack;
      if (onBack) {
        onBack();
      }
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  onPhotosFetchedSuccess = (data) => {
    var photos = data.edges.map((asset) => {
      return asset.node.image;
    });
  };
  onPhotosFetchError = (error) => {
    console.err(error);
  };

  renderImage = () => {
    const {imagePath} = this.state;
    const capturedImages = this.props.route.params.imageURL;
    const imagesarray = capturedImages.map((image) => {
      return {source: {uri: image}};
    });
    console.log('render image path: ', imagePath);
    return (
      <Image
        resizeMode="contain"
        style={{flex: 1}}
        source={{uri: imagePath ? imagePath : null}}
      />
    );
  };

  renderDeleteButton = () => {
    return (
      <TouchableOpacity
        style={styles.deleteButton2}
        onPress={this.onPressDeleteButton}>
        <Text style={styles.buttonText2}>DELETE</Text>
      </TouchableOpacity>
    );
  };

  renderKeepButton = () => {
    return (
      <TouchableOpacity
        style={styles.keepButton2}
        onPress={this.onPressKeepButton}>
        <Text style={styles.buttonText2}>KEEP</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <NavigationEvents
          onDidFocus={this.handleDidFocus}
          onWillBlur={this.handleWillBlur}
        /> */}
        <StatusBar hidden={true} />
        {this.renderImage()}
        {this.renderDeleteButton()}
        {this.renderKeepButton()}
      </View>
    );
  }
}
export default ShowCapturedImagePage;

