import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
  Platform,
} from 'react-native';
import { Camera } from 'react-native-vision-camera';
import images from '../../../../common/Images';
import styles from './styles';
import MainFrame from '../../../../common/components/MainFrame';
import { HeaderBarWithBackComponent } from '../../../../common/widgets/HeaderWidgets';
import autocompleteLocation from '../../api/GetPlacesServices';
import moment from 'moment';
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Colors from '../../../../common/Colors';

class AddProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      propertyAddress: '',
      searchedData: [],
      valueSet: false,
      buttonStateHolder: false,
      placeID: '',
      projectId: '',
    };
  }

  renderEnterPropertyAddressSection = () => {
    return (
      <View style={styles.enterPropertyContainer}>
        <Text style={styles.labelText}>Enter Property Address</Text>
        <TextInput
          style={styles.inputFieldsContainer}
          placeholder={'Property Address'}
          style={styles.placeholderStyling}
          testID="address"
          underlineColorAndroid="transparent"
          autoCapitalize="words"
          autoCorrect={false}
          textContentType="none"
          keyboardType="default"
          autoFocus={false}
          onChangeText={(text) => this.autocompleteLocation(text)}
          value={this.state.propertyAddress}
        />
        <EvilIcons name="location" size={25} color={Colors.primary} style={{ position: 'absolute', top: (Platform.OS === 'ios' ? 100 : 80), left: 25 }} />
        <Text style={styles.extraText}>
          If this is a new build, or can’t be found, just type in the full
          address and choose ‘Get Started’
        </Text>
      </View>
    );
  };

  autocompleteLocation = async (text) => {
    const { propertyAddress } = this.state;
    this.setState({ propertyAddress: text });
    if (propertyAddress === '' || propertyAddress === null) {
      this.setState({ buttonStateHolder: false });
    } else {
      const response = await autocompleteLocation(propertyAddress);
      this.setState({
        searchedData: response.predictions,
        valueSet: true,
        buttonStateHolder: true,
      });
    }
  };

  renderPlaces = ({ item }) => {
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => this.onPressItem(item.description, item.place_id)}>
          <EvilIcons name="location" size={20} color={Colors.primary} style={{ marginTop: (Platform.OS === 'ios' ? 10 : 3) }} />
          <Text style={styles.text}>{item.description}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  onPressItem = (selectedItemvalue, placeId) => {
    console.log('projectId,', moment().format('D MMM YYYY H:M:S a'));
    Keyboard.dismiss();
    this.setState({
      placeID: placeId,
      valueSet: false,
      propertyAddress: selectedItemvalue,
      projectId: moment().format('D MMM YYYY H:M:S a'),
    });
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  onPressTakePhoto = async () => {
    const { placeID, projectId } = this.state;
    const cameraPermission = await Camera.getCameraPermissionStatus()
    const microphonePermission = await Camera.getMicrophonePermissionStatus()
    console.log('placeId: ', this.state.placeID, 'projectId', projectId);
    const { propertyAddress } = this.state;
    this.props.navigation.navigate('CameraPage', {
      property: propertyAddress,
      placeId: placeID,
      projectId: projectId,
    });
  };

  renderButton = () => {
    const { buttonStateHolder } = this.state;
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={
            buttonStateHolder
              ? styles.addProjectButton
              : styles.addProjectButtonOpcity
          }
          onPress={this.onPressTakePhoto}
          disabled={!buttonStateHolder}>
          <Image source={images.camerIcon} style={styles.imageIcon} />
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { searchedData, valueSet } = this.state;
    return (
      <MainFrame>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.mainContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.mainContainer}>
              <HeaderBarWithBackComponent
                title="add project"
                goBack={this.goBack}
              />
              {this.renderEnterPropertyAddressSection()}
              {valueSet ? (
                <FlatList
                  keyboardShouldPersistTaps="always"
                  data={searchedData}
                  contentContainerStyle={{ paddingBottom: 100, paddingTop: 20 }}
                  renderItem={this.renderPlaces}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : null}
              {this.renderButton()}
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </MainFrame>
    );
  }
}
export default AddProjectPage;
