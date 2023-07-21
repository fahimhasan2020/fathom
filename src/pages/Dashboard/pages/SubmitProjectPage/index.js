import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,

} from 'react-native';
import RNFS from "react-native-fs"
import styles from './styles';
import MainFrame from '../../../../common/components/MainFrame';
import { HeaderBarWithBackComponent } from '../../../../common/widgets/HeaderWidgets';
import images from '../../../../common/Images';
import { getData, saveData } from '../../../../common/Helper';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
// import * as AWS from '@aws-sdk/client-s3';
import KeepAwake from 'react-native-keep-awake';
// import { JSONOutputFilterSensitiveLog, S3Client } from '@aws-sdk/client-s3';
// import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
// import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import * as Progress from 'react-native-progress';
import colors from '../../../../common/Colors';
import moment from 'moment';
import { jsonFetch } from '../../../../common/Helper';
import database,{ firebase } from '@react-native-firebase/database';

// const client = new S3Client({
//   region: 'us-east-1',
//   credentials: fromCognitoIdentityPool({
//     client: new CognitoIdentityClient({ region: 'us-east-1' }),
//     identityPoolId: 'us-east-1:f5ea5ffb-01b7-4d55-b7b6-328c34d2e408',
//   }),
// });

class SubmitProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      alertModal: false,
      isLoadingProgress: false,
      isLoadingLoader: false,
      fileCounter: 0,
      totalImages: 0,
      placeTitle: '',
      isImagesUploading: false,
      message: '',
      showMessageContainer: false,
      uploadCompleted: false,
      access_token: '',
      unitprice:''
    };
  }

  componentDidMount = () => {
    firebase.app().database('https://devfahimhasan-default-rtdb.asia-southeast1.firebasedatabase.app/')
    .ref('User')
    .on('value', snapshot => {
     
      const price = snapshot.val();
      this.setState({unitprice:price.unitprice});
      
    });
    this.getGoogleAccessToken();
  }

  getGoogleAccessToken = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", "320434221609-srp7f4l1u1agnr8os5ina86sakq9rc1d.apps.googleusercontent.com");
    urlencoded.append("client_secret", "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");
    urlencoded.append("refresh_token", "1//04z1xJtCLMbalCgYIARAAGAQSNwF-L9IrP5a_d4SZqTjQScKyjuphsKnj2zY9jq5t7PGOCLEjln4otxfwrJzePCtg7gyvRbc44Dw");
    urlencoded.append("grant_type", "refresh_token");
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded.toString(),
    };
    fetch("https://oauth2.googleapis.com/token", requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('access token from refresh token',result);
        this.setState({ access_token: result.access_token });
      })
      .catch(error => console.log('error', error));
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  setAlertModalVisible = (visible) => {
    this.setState({ alertModal: visible });
  };

  onPressSubmitProject = async () => {
    let data = await getData('PROPERTIES');
    const placeId = this.props.route.params.placeId;
    data = JSON.parse(data);
    data = data.map((property, index) => {
      if (property.googlePlaceId === placeId) {
        this.setState({ placeTitle: property.title });
      }
      return property;
    });
    this.uploadImagesOnAWS();
  };

  onPressOkayButton = async () => {
    const { modalVisible } = this.state;
    this.setState({
      modalVisible: !modalVisible,
      isImagesUploading: true,
    });
    this.props.navigation.navigate('HomePage');
  };

  onPressButton = async () => {
    const { alertModal } = this.state;
    this.setState({
      alertModal: !alertModal,
    });
  };

  SubmitProjectAPI = async () => {
    let userData = await getData('USER');
    const placeId = tthis.props.route.params.placeId;
    const projectId = this.props.route.params.projectId;
    let data = await getData('PROPERTIES');
    userData = JSON.parse(userData);
    const imagesList = this.props.route.params.ImagesList;
    let { placeTitle, message } = this.state;
    let userTitle = '';
    if (userData.contact) {
      userTitle = userData.contact.firstName + ' ' + userData.contact.lastName;
    }
    let paramsArray = {
      date: moment().format('MM/DD/YYYY'),
      address: placeTitle,
      agentEmail: userData.userEmail,
      agentName: userTitle,
      name: userTitle,
      comments: message,
      photosCount: imagesList.length - 1,
      totalPrice: (imagesList.length - 1) * 2,
    };

    var formBody = [];
    for (var property in paramsArray) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(paramsArray[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    const response = await jsonFetch(
      'https://api.naberly.com/photosSendEmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,
      },
    );
    if (response) {
      console.log('response', response);
      data = JSON.parse(data);
      data = data.map((property, index) => {
        if (property.projectId === projectId) {
          property.status = 'Submitted';
          property.uploadStatus = this.state.uploadCompleted;
        }
        return property;
      });
      saveData('PROPERTIES', JSON.stringify(data));
    }
    return response;
  };

  uploadFileGCloud = async (uploadParams) => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json; charset=UTF-8");
      myHeaders.append("Authorization", "Bearer " + "ya29.a0AWY7CklhT9vBfNofJaGZscI8M8XfcvS3Tj-cv6sUT-2OoB8GQAJTW8gZOorhTpJbbcYOu5OiXZKl82MUYrGmivqTUNuYGI0hPFLXJj93m6298igpd8XUHbyP0TFbpj5Ujb2w8KccyYSLRXln9poV9U4fh7kRf9UaCgYKAa0SARESFQG1tDrpUeM_q76kRpPc9xtpYpNHrg0166");
      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({ name: uploadParams.name, mimeType: 'image/jpg', parents: ['1Qc3gjo_OI-YcpbcsRyF6v4IdCghOc7Yj'] }),
        redirect: 'follow'
      };

      const uploadResponse = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", requestOptions);
      const uploadLocation = uploadResponse.headers.get('Location');

      const myHeadersa = new Headers();
      myHeadersa.append("Content-Type", "application/octet-stream");
      const fileData = await RNFS.readFile(uploadParams.uri, 'base64');
      const requestOptionsa = {
        method: 'PUT',
        headers: myHeadersa,
        body: fileData,
        redirect: 'follow'
      };
      const uploadFileResponse = await fetch(uploadLocation, requestOptionsa);
      const uploadFileResult = await uploadFileResponse.text();
      console.log('File upload result:', uploadFileResult);
    } catch (error) {
      console.log('Error uploading file:', error);
    }
  };


  uploadImagesOnAWS = async () => {
    let userData = await getData('USER');
    let data = await getData('PROPERTIES');
    const placeId = this.props.route.params.placeId;
    const projectId = this.props.route.params.projectId;
    console.log('submitProjectPage', projectId);
    userData = JSON.parse(userData);
    const dateStrUploaded = await getData(`${projectId}Datestr`);
    let datestr = dateStrUploaded
      ? dateStrUploaded
      : moment().format('D MMM YYYY');
    console.log('344 date str', dateStrUploaded);
    data = JSON.parse(data);
    data = data.map((property, index) => {
      if (property.projectId === projectId) {
        property.uploadStatus = this.state.uploadCompleted;
      }
      return property;
    });
    saveData('PROPERTIES', JSON.stringify(data));

    let uploadedImages = await getData(projectId);
    console.log('344-All', uploadedImages);
    const imagesList = this.props.route.params.ImagesList;

    const bucketName = 'rps-app-photos';
    var totalLength = (imagesList.length - 1) * 5;
    this.setState({ totalImages: totalLength });
    console.log('344 Total', totalLength);
    this.setState({
      isLoadingLoader: true,
      isImagesUploading: true,
      alertModal: true,
    });
    let { placeTitle } = this.state;
    let userTitle = userData.userEmail;
    if (userData.contact) {
      userTitle = userData.contact.firstName + ' ' + userData.contact.lastName;
    }

    let filteredArray;

    const filteringTheUnFiltered = () => {
      filteredArray = imagesList.filter(
        (item, i) => i !== imagesList.length - 1,
      );
      uploadedImages
        ? filteredArray.map((imagesArray, ind) => {
          imagesArray.map((image, index) => {
            for (let i = 0; i < uploadedImages.length; i++) {
              if (image == uploadedImages[i]) {
                filteredArray[ind].splice(index, 1);
              }
            }
          });
        })
        : null;
    };

    for (let i = 0; i < 5; i++) {
      filteringTheUnFiltered();
    }

    let totalImagesCount = 0;
    for (let i = 0; i < filteredArray.length; i++) {
      for (let j = 0; j < filteredArray[i].length; j++) {
        totalImagesCount += 1;
      }
    }
    let counter = totalLength - totalImagesCount;
    console.log('344', filteredArray, totalImagesCount);
    let uploadedImgs = uploadedImages ? [...uploadedImages] : [];
    console.log('344 c', counter, totalImagesCount);

    if (totalImagesCount === 0) {
      this.setState({
        uploadCompleted: true,
      });
      this.SubmitProjectAPI();
      setTimeout(() => {
        this.setState({
          modalVisible: true,
          isLoadingProgress: false,
          isImagesUploading: false,
          showMessageContainer: true,
        });
      }, 5000);
      return;
    }
    filteredArray.map((projectListImages, arrIndex) => {
      projectListImages.map((imagesWithExposure, subIndex) => {
        let image_name = `shot${arrIndex + 1}_image${subIndex + 1}.jpg`;
        let image_with_exposure = {
          uri: imagesWithExposure,
          name: image_name,
          type: 'image/jpg',
        };
        const uploadParams = {
          Bucket: bucketName,
          acl: 'private-read',
          Key: datestr + '/' + userTitle + '/' + placeTitle + '/' + image_name,
          Body: image_with_exposure,
        };
        console.log('344 params', uploadParams);
        this.uploadFileGCloud(image_with_exposure);
        // try {
        //   const promise = client.send(new AWS.PutObjectCommand(uploadParams));
        //   promise.then(
        //     (data) => {
        //       uploadedImgs.push(imagesWithExposure);
        //       saveData(projectId, uploadedImgs);
        //       dateStrUploaded ? null : saveData(`${projectId}Datestr`, datestr);
        //       console.log('Uploaded images are', data);
        //       counter++;
        //       this.setState({
        //         isLoadingProgress: true,
        //         isLoadingLoader: false,
        //         progressValue: (counter * (100 / totalLength)) / 100,
        //         fileCounter: Math.floor(counter * (100 / totalLength)),
        //       });

        //       if (counter === totalLength) {
        //         this.setState({ uploadCompleted: true });
        //         const response = this.SubmitProjectAPI();
        //         setTimeout(() => {
        //           this.setState({
        //             alertModal: false,
        //             modalVisible: true,
        //             isLoadingProgress: false,
        //             isImagesUploading: false,
        //             showMessageContainer: true,
        //           });
        //         }, 5000);
        //       }
        //     },
        //     (error) => {
        //       console.log('error while uploading: ', error);
        //       this.setState({
        //         isLoadingProgress: false,
        //         isImagesUploading: false,
        //         showMessageContainer: true,
        //       });
        //     },
        //   );
        // } catch (err) {
        //   console.log('uploadImagesOnAWS' + 'error' + err.message);
        // }
      });
    });
  };

  renderTotalPriceSection = (unitprice) => {
    const totalShots = this.props.route.params.ImagesList.length - 1;
    const propertyTitle = this.props.route.params.propertyAddress;
    return (
      <View style={styles.mainView}>
        <Text style={styles.propertyText}>{propertyTitle}</Text>
        <View style={styles.totalPriceContainer}>
          <Image source={images.imagesPreviewIcon} style={styles.image} />
          <View style={styles.subView}>
            <Text style={styles.totalPriceText}>Total Price </Text>
            <Text style={styles.dollarText}>${parseInt(this.state.unitprice) * totalShots}</Text>
          </View>
        </View>
      </View>
    );
  };

  renderOrderDetailsList = (unitprice) => {
    const totalShots = this.props.route.params.ImagesList.length - 1;
    return (
      <View>
        <Text style={styles.orderDetailsText}>Order Details</Text>
        <View style={styles.orderDetailsContainer}>
          <View style={styles.textContainers}>
            <Text style={styles.shotsText}>Number Of Shots</Text>
            <Text style={styles.digitText}>{totalShots}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.textContainers}>
            <Text style={styles.shotsText}>Price Per Shot</Text>
            <Text style={styles.digitText}>${unitprice}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.textContainers}>
            <Text style={styles.totalPrice}>Total Price</Text>
            <Text style={styles.totalDigitText}>${unitprice * totalShots}</Text>
          </View>
        </View>
      </View>
    );
  };
  renderSpecialInstructions = () => {
    return (
      <View>
        <Text style={styles.orderDetailsText}>Special Instructions</Text>
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            placeholder="Please type special instructions here..."
            numberOfLines={4}
            multiline={true}
            onChangeText={(msgValue) => this.setState({ message: msgValue })}
            placeholderTextColor={colors.lightPurple}
          />
        </View>
      </View>
    );
  };

  renderSubmitProjectButton = () => {
    const { isImagesUploading } = this.state;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            !isImagesUploading
              ? styles.addProjectButton
              : styles.addProjectButtonWithOpacity
          }
          onPress={this.onPressSubmitProject}
          disabled={isImagesUploading}>
          <Text style={styles.ButtonText}>SUBMIT PROJECT </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderMessageContainer = () => {
    return (
      <View>
        <Text style={styles.orderDetailsText}>Special Instructions</Text>
        <View style={styles.textAreaContainer}>
          <Text style={styles.messageInstructionText}>
            Please do not delete the images from your phone’s photo gallery
            until after you’ve received your beautifully edited photos!{' '}
          </Text>
        </View>
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
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titleText}>Project successfully sent!</Text>
            <Text style={styles.subtitleText}>
              While our photo wizards work on your photos, please allow up to 48
              hours for delivery, although we generally get them sent out next
              day! At that time, you’ll also receive payment instructions!
            </Text>
            <Text style={styles.subtitleText}>
              Please do not delete the images from your phone’s photo gallery
              until after you’ve received your beautifully edited photos!
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.onPressOkayButton()}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };
  renderAlertModal = () => {
    const { alertModal } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={alertModal}
        onRequestClose={() => {
          this.setAlertModalVisible(!alertModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.alertModalView}>
            <Text style={styles.titleText}>Pay Attention</Text>
            <Text style={styles.subtitleText}>
              Please do not close app until upload gets completed
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => this.onPressButton()}>
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    const {
      modalVisible,
      progressValue,
      isLoadingProgress,
      isLoadingLoader,
      fileCounter,
      showMessageContainer,
      alertModal,
    } = this.state;
    return (
      <MainFrame>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={
              !modalVisible
                ? styles.mainContainer
                : styles.mainContainerWithOpacity
            }>
            <KeepAwake />
            <StatusBar hidden={false} />
            <HeaderBarWithBackComponent
              goBack={() => this.props.navigation.popToTop()}
              title="submit project"
            />
            {modalVisible ? this.renderModal() : null}
            {alertModal ? this.renderAlertModal() : null}
            {this.renderTotalPriceSection(parseInt(this.state.unitprice))}
            {!isLoadingLoader && !isLoadingProgress && !showMessageContainer
              ? this.renderSpecialInstructions()
              : null}
            {this.renderOrderDetailsList(parseInt(this.state.unitprice))}
            {!isLoadingLoader ? null : (
              <View style={styles.activityContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
              </View>
            )}
            {isLoadingProgress ? (
              <View style={{ alignSelf: 'center' }}>
                <Progress.Bar progress={progressValue} width={380} />
                <Text style={styles.imagesCounter}>
                  {fileCounter} % uploaded
                </Text>
              </View>
            ) : null}
            {this.renderSubmitProjectButton()}
          </View>
        </TouchableWithoutFeedback>
      </MainFrame>
    );
  }
}

export default SubmitProjectPage;
