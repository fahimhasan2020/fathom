import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Modal,
  Platform,
} from 'react-native';
import styles from './styles';
import images from '../../../../common/Images';
import { NavigationEvents } from '@react-navigation/native';;
import MainFrame from '../../../../common/components/MainFrame';
import { HeaderBarWithBackComponent } from '../../../../common/widgets/HeaderWidgets';
import CheckBox from '@react-native-community/checkbox';
import { getData, saveData } from '../../../../common/Helper';
import Orientation from 'react-native-orientation-locker';
import ImageView from 'react-native-image-viewing';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

var RNFS = require('react-native-fs');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      selectedPhotos: [],
      firstPhoto: '',
      showImage: false,
      showImageUri: '',
      showCheckbox: false,
      visible: false,
      galleryImages: [],
      googlePlaceId: '',
      isEditable: true,
      showAddMoreTile: false,
      modalVisible: false,
    };
  }

  componentDidMount() {
    this.getPageData();
  }

  handleRemoveItem(index) {
    const updatedPhotos = [...this.state.photos];
    updatedPhotos.splice(index, 1);
    this.setState({ photos: updatedPhotos });
    if (index === 0) {
      this.setState({ firstPhoto: '' })
    }
  }

  getPageData = async () => {
    Orientation.lockToPortrait();
    let data = await getData('PROPERTIES');
    const propertAddress = this.props.route.params.property;
    let projectId = this.props.route.params.projectId;
    if (data) {
      data = JSON.parse(data);
      const selectedProperty = data.find(
        (item) => item.projectId === projectId,
      );
      if (selectedProperty) {
        if (selectedProperty.status === 'Submitted') {
          this.setState({ isEditable: false });
        } else {
          selectedProperty.propertyPic.push({ name: 'Add', propertyPic: '' });
        }
        if (selectedProperty) {
          this.setState({
            photos: selectedProperty.propertyPic,
            firstPhoto: selectedProperty.propertyPic[0][0],
            googlePlaceId: selectedProperty.googlePlaceId,
          });
        }
      } else {
        this.setState({ showAddMoreTile: true });
      }
    }
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  goBack = () => {
    this.props.navigation.popToTop();
  };

  onPressItem = (imageUri) => {
    this.setState({
      showImageUri: imageUri,
    });
  };

  renderItem = ({ item, index }) => {
    const { selectedPhotos, showCheckbox,isEditable } = this.state;
    return item.name !== 'Add' ? (
      <View style={styles.imageContainer}>
        <Pressable onPress={(event) => this.onCheckBoxPress(item)}>
          {showCheckbox ? (
            <CheckBox
              onChange={() => this.onCheckBoxPress(item)}
              disabled={false}
              value={selectedPhotos.includes(item)}
              style={styles.checkBoxStyling}
            />
          ) : null}

          <Image
            style={!showCheckbox ? styles.subImages : styles.subImages2}
            source={{ uri: item ? item[0] : null }}
          />
          {!isEditable?null:<Pressable onPress={() => { this.handleRemoveItem(index) }} style={{ position: 'absolute', top: 15, left: 10 }}>
            <MaterialIcons name="remove-circle" size={20} style={{}} color="#fff" />
          </Pressable>}
          

        </Pressable>
      </View>
    ) : (
      this.renderAddMoreTile()
    );
  };

  onCheckBoxPress = (item) => {
    let selectedPhotos = this.state.selectedPhotos;
    let showCheckbox = this.state.showCheckbox;
    if (!showCheckbox) {
      const imagesarray = [{ uri: item[0] }]; //item.map((image) => {return {  uri: image  }});
      this.setState({ galleryImages: imagesarray, visible: true });
      Orientation.unlockAllOrientations();
    } else {
      const index = selectedPhotos.indexOf(item);
      if (index >= 0) {
        selectedPhotos.splice(index, 1);
      } else {
        selectedPhotos.push(item);
      }
      this.setState({ selectedPhotos });
    }

    const dirHome = Platform.select({
      ios: `${RNFS.DocumentDirectoryPath}/Pictures`,
      android: `${RNFS.ExternalStorageDirectoryPath}/Pictures`,
    });
    const dirPictures = `${dirHome}/Fathom`;
    console.log('RNFS Path', dirPictures);
  };

  onGalleryClose = () => {
    this.setState({ visible: false });
    Orientation.lockToPortrait();
  };

  renderFirstImageWithTitle = () => {
    const propertAddress = this.props.route.params.property;
    const { firstPhoto } = this.state;
    return (
      <View style={styles.subContainer}>
        <Image
          style={styles.mainImage}
          source={{ uri: firstPhoto ? firstPhoto : null }}
        />
        <Text style={styles.label}> {propertAddress}</Text>
      </View>
    );
  };

  onPressSubmitProject = () => {
    if (this.state.photos.length > 0) {
      const propertAddress = this.props.route.params.property;
      const projectId = this.props.route.params.projectId;
      console.log('ViewProjectScreen', projectId);
      const { photos, googlePlaceId } = this.state;
      this.props.navigation.push('SubmitProjectPage', {
        propertyAddress: propertAddress,
        ImagesList: photos,
        placeId: googlePlaceId,
        projectId: projectId,
      });
    } else {
      alert('No photo selected');
    }

  };

  renderButton = () => {
    const { showAddMoreTile } = this.state;
    const status = this.props.route.params.uploadStatus;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            !showAddMoreTile
              ? styles.addProjectButton
              : styles.addProjectButtonWithOpacity
          }
          onPress={this.onPressSubmitProject}
          disabled={showAddMoreTile}>
          <Text style={styles.ButtonText}>
            {status || status === undefined
              ? 'SUBMIT PROJECT'
              : 'RESUME SUBMISSION'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  onPressSelectButton = () => {
    this.setState({
      showCheckbox: !this.state.showCheckbox,
    });
  };

  onPressTrashIcon = async () => {
    this.setState({ modalVisible: true });
  };

  onPressCancelButtonModal = () => {
    this.setState({ modalVisible: false });
  };

  onPressOK = async () => {
    let data = await getData('PROPERTIES');
    const propertAddress = this.props.route.params.property;
    const projectId = this.props.route.params.projectId;
    data = JSON.parse(data);
    const photos = this.state.photos;
    const selectedPhotos = this.state.selectedPhotos;
    for (var i = 0; i < selectedPhotos.length; i++) {
      const index = photos.findIndex((photo) =>
        photo.includes(selectedPhotos[i][0]),
      );
      if (index >= 0) {
        photos.splice(index, 1);
      }
    }

    let delpictures = [];
    for (var i = 0; i < selectedPhotos.length; i++) {
      for (var j = 0; j < selectedPhotos[i].length; j++) {
        delpictures.push(selectedPhotos[i][j]);
      }
    }
    CameraRoll.deletePhotos(delpictures);
    this.setState({
      firstPhoto: photos.length ? photos[0][0] : null,
      showCheckbox: false,
      selectedPhotos: [],
      photos,
    });
    const photoslist = photos.filter((item) => item.name !== 'Add');
    data = data.map((property) => {
      if (property.projectId === projectId) {
        return {
          ...property,
          propertyPic: photoslist,
        };
      } else {
        return property;
      }
    });
    this.setState({ modalVisible: false });
    await saveData('PROPERTIES', JSON.stringify(data));
  };

  onPressCancelButton = () => {
    this.setState({
      selectedPhotos: [],
      showCheckbox: !this.state.showCheckbox,
    });
  };

  renderDeletion = () => {
    const { selectedPhotos } = this.state;
    return (
      <View style={styles.deleteContainer}>
        <Text style={styles.deletionText}>
          {selectedPhotos.length} Photo Selected
        </Text>
        <TouchableOpacity onPress={this.onPressTrashIcon}>
          <Image style={styles.trashStyles} source={images.deleteIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  onPressAddMoreImages = () => {
    const propertyAddress = this.props.route.params.property;
    const placeId = this.props.route.params.placeId;
    const projectId = this.props.route.params.projectId;
    console.log('ViewProjectPage', projectId);
    this.props.navigation.navigate('CameraPage', {
      property: propertyAddress,
      placeId: placeId,
      projectId: projectId,
    });
  };

  renderAddMoreTile = () => {
    const { showAddMoreTile } = this.state;
    return (
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={
            !showAddMoreTile
              ? styles.addMoreProjectButton
              : styles.addMoreProjectButton2
          }
          onPress={this.onPressAddMoreImages}>
          <Image source={images.plusIcon} style={styles.icon} />
          <Text style={styles.moreImagesText}>Add More</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderModal = () => {
    const { modalVisible } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          this.setModalVisible(!modalVisible);
        }}>
        <View style={styles.mainMoadl}>
          <View style={styles.modalSubView}>
            <View style={styles.titleViewStyle}>
              <Text style={styles.modalTitleText}>Delete Photo</Text>
            </View>
            <View style={styles.separator} />
            <Text style={styles.subtitleText}>
              Are you sure you want to delete this photo?{' '}
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => this.onPressCancelButtonModal()}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => this.onPressOK()}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {
      isEditable,
      showCheckbox,
      photos,
      showImageUri,
      visible,
      galleryImages,
      showAddMoreTile,
      modalVisible,
    } = this.state;
    return (
      <MainFrame>
        <StatusBar hidden={false} />
        {/* <NavigationEvents onDidFocus={this.getPageData} /> */}
        {!showCheckbox ? (
          <HeaderBarWithBackComponent
            title="Project Review"
            rightBtn={!isEditable ? null : 'Select'}
            buttonTitle={!isEditable ? null : 'Select'}
            goBack={this.goBack}
            rightBtnPress={!isEditable ? null : this.onPressSelectButton}
          />
        ) : (
          <HeaderBarWithBackComponent
            title="Project Review"
            rightBtn="Select"
            buttonTitle="Cancel"
            goBack={this.goBack}
            rightBtnPress={this.onPressCancelButton}
          />
        )}
        {!this.state.showImage ? (
          <View style={styles.mainContainer}>
            {this.renderFirstImageWithTitle()}
            {showAddMoreTile ? this.renderAddMoreTile() : null}
            <FlatList
              data={photos}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => String(index)}
              numColumns={3}
            />
          </View>
        ) : (
          <View style={styles.showImageContainer}>
            <Image style={styles.onOpeningImage} source={{ uri: showImageUri }} />
          </View>
        )}
        {showCheckbox
          ? this.renderDeletion()
          : !isEditable
            ? null
            : this.renderButton()}
        <ImageView
          images={galleryImages}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => this.onGalleryClose()}
        />
        {modalVisible ? this.renderModal() : null}
      </MainFrame>
    );
  }
}

export default HomePage;
