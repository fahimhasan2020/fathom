

// export default class HomePage extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dataObj: [],
//       loading: false,
//       refreshing: false,
//       isNavigate: false,
//       modalVisible: false,
//       isDelete: false,
//       selectedProperty: '',
//     };
//   }

//   componentDidMount() {
//     firebase.app().database('https://devfahimhasan-default-rtdb.asia-southeast1.firebasedatabase.app/')
//       .ref('User')
//       .on('value', snapshot => {
//         console.log('User data: ', snapshot.val());
//         const price = snapshot.val();
//         this.setState({ unitprice: price.unitprice });
//       });
//     this.getData();
//   }
//   setModalVisible = (visible) => {
//     this.setState({ modalVisible: visible });
//   };

//   getData = async () => {
//     this.setState({ refreshing: true, loading: true });
//     let data = await getData('PROPERTIES');
//     let isNavigate = false;
//     if (data) {
//       data = JSON.parse(data);
//       const processingProjects = data.filter(
//         (proj) => proj.status === 'Not Submitted',
//       );
//       const submittedProjects = data.filter(
//         (proj) => proj.status === 'Submitted',
//       );
//       const dataObj = [];
//       if (processingProjects.length) {
//         isNavigate = true;
//         dataObj.push({
//           sectionId: 'Not Submitted',
//           data: processingProjects,
//         });
//       }
//       if (submittedProjects.length) {
//         isNavigate = true;
//         dataObj.push({
//           sectionId: 'Submitted',
//           data: submittedProjects,
//         });
//       }
//       this.setState({
//         isNavigate: isNavigate,
//         loading: false,
//         refreshing: false,
//         dataObj,
//       });
//     }
//   };

//   deleteProperty = async (propertyAddress) => {
//     let data = await getData('PROPERTIES');
//     data = JSON.parse(data);
//     const updatedData = [];
//     let delProperty;
//     data.map((property) => {
//       if (property.projectId !== propertyAddress.projectId) {
//         updatedData.push(property);
//       } else {
//         delProperty = property;
//       }
//     });
//     saveData('PROPERTIES', JSON.stringify(updatedData));

//     let delpictures = [];
//     for (var i = 0; i < delProperty.propertyPic.length; i++) {
//       for (var j = 0; j < delProperty.propertyPic[i].length; j++) {
//         delpictures.push(delProperty.propertyPic[i][j]);
//       }
//     }
//     CameraRoll.deletePhotos(delpictures);
//     setTimeout(() => {
//       this.getData();
//     }, 2000);
//     this.setState({ modalVisible: false });
//   };

//   onPressTrashIcon = async (propertyAddress) => {
//     this.setState({
//       selectedProperty: propertyAddress,
//       modalVisible: true,
//       isDelete: true,
//     });
//   };

//   playVideo = () => {
//     this.props.navigation.navigate('PlayVideoPage');
//   };

//   onPressItem = (propertyAddress, status, projectId) => {
//     this.props.navigation.navigate('ViewProjectPage', {
//       property: propertyAddress,
//       uploadStatus: status,
//       projectId: projectId,
//     });
//   };

//   renderItem = ({ item }) => {
//     console.log('Item', item);
//     console.log('homePage', item.projectId);
//     const firstImages = item.propertyPic.length ? item.propertyPic[0] : null;
//     return (
//       <View style={{ marginTop: 2 }}>
//         <TouchableOpacity
//           style={styles.listItem}
//           onPress={() =>
//             this.onPressItem(item.title, item.uploadStatus, item.projectId)
//           }>
//           <View style={styles.subContainer}>
//             <Image
//               source={{ uri: firstImages ? firstImages[0] : null }}
//               style={styles.subImages}
//             />
//             <Text style={styles.label}>{item.title ? item.title : null}</Text>
//           </View>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.trashContainer}
//           onPress={() => this.onPressTrashIcon(item)}>
//           <Image style={styles.trashStyles} source={images.deleteIcon} />
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   renderButton = () => {
//     return (
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={styles.addProjectButton}
//           onPress={this.onPressAddProject}>
//           {/* <Image source={images.plusIcon} style={styles.imageIcon} /> */}
//           <Text style={styles.ButtonText}>Add Project </Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };
//   renderNoProject = () => {
//     return (
//       <View style={styles.NoProjectContainer}>
//         <Text style={styles.noProjectText}>
//           Press "Add Project" to start a new project. Be sure to watch the "
//           <Text style={styles.linkText} onPress={this.playVideo}>
//             How to
//           </Text>
//           " video before you get started.
//         </Text>
//       </View>
//     );
//   };

//   onPressAddProject = () => {
//     this.props.navigation.navigate('AddProjectPage');
//   };

//   onPressLogout = () => {
//     this.setState({
//       modalVisible: true,
//       isDelete: false,
//     });
//   };

//   onPressOK = async () => {
//     this.setState({ modalVisible: false });
//     await removeData('USER');
//     this.props.navigation.navigate('LoginPage');
//   };

//   onPressCancel = () => {
//     this.setState({ modalVisible: false });
//   };

//   toggleDrawer = () => {
//     const { navigation } = this.props;
//     navigation.toggleDrawer();
//   };

//   renderModal = () => {
//     const { modalVisible, isDelete, selectedProperty } = this.state;
//     let title = 'Logout';
//     let subTitle = 'Are you sure you want to Logout?';
//     if (isDelete) {
//       title = 'Delete Project';
//       subTitle = 'Are you sure you want to delete project?';
//     }
//     return (
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           this.setModalVisible(!modalVisible);
//         }}>
//         <View style={styles.mainMoadl}>
//           <View style={styles.modalSubView}>
//             <View style={styles.titleViewStyle}>
//               <Text style={styles.titleText}>{title}</Text>
//             </View>
//             <View style={styles.separator} />
//             <Text style={styles.subtitleText}>{subTitle}</Text>
//             <View style={styles.modalButtonContainer}>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={() => this.onPressCancel()}>
//                 <Text style={styles.modalButtonText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.modalButton}
//                 onPress={
//                   !isDelete
//                     ? () => this.onPressOK()
//                     : () => this.deleteProperty(selectedProperty)
//                 }>
//                 <Text style={styles.modalButtonText}>OK</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </Modal>
//     );
//   };

//   render() {
//     const { dataObj, isNavigate, refreshing, loading, modalVisible } = this.state;
//     return (
//       <MainFrame>
//         <HeaderBarComponent
//           noMenu={false}
//           isLoading={loading}
//           title="my projects"
//           rightBtn="Notifications Button"
//           rightBtnPress={this.onPressLogout}
//           toggle={this.toggleDrawer}
//         />
//         <NavigationEvents onDidFocus={this.getData} />
//         <View style={styles.mainContainer}>
//           {isNavigate ? (
//             <SectionList
//               sections={dataObj}
//               refreshing={refreshing}
//               onRefresh={this.getData}
//               contentContainerStyle={{ paddingBottom: 100 }}
//               renderItem={this.renderItem}
//               keyExtractor={(item, index) => item + index}
//               renderSectionHeader={({ section }) => (
//                 <View style={styles.textContainer}>
//                   <Text style={styles.reviewText}>{section.sectionId}</Text>
//                 </View>
//               )}
//             />
//           ) : (
//             this.renderNoProject()
//           )}
//           {modalVisible ? this.renderModal() : null}
//           {this.renderButton()}
//         </View>
//       </MainFrame>
//     );
//   }
// }


import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SectionList,
  Modal,
} from 'react-native';
import styles from './styles';
import images from '../../../../common/Images';
import { NavigationEvents } from '@react-navigation/native';
import { getData, saveData, removeData } from '../../../../common/Helper';
import MainFrame from '../../../../common/components/MainFrame';
import { HeaderBarComponent } from '../../../../common/widgets/HeaderWidgets';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import database, { firebase } from '@react-native-firebase/database';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataObj: [],
      loading: false,
      refreshing: false,
      isNavigate: false,
      modalVisible: false,
      isDelete: false,
      selectedProperty: '',
    };
  }

  componentDidMount() {
    firebase.app().database('https://devfahimhasan-default-rtdb.asia-southeast1.firebasedatabase.app/')
      .ref('User')
      .on('value', snapshot => {
        console.log('User data: ', snapshot.val());
        const price = snapshot.val();
        this.setState({ unitprice: price.unitprice });
      });
    this.getData();
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  getData = async () => {
    this.setState({ refreshing: true, loading: true });
    let data = await getData('PROPERTIES');
    let isNavigate = false;
    if (data) {
      data = JSON.parse(data);
      const processingProjects = data.filter(
        (proj) => proj.status === 'Not Submitted',
      );
      const submittedProjects = data.filter(
        (proj) => proj.status === 'Submitted',
      );
      const dataObj = [];
      if (processingProjects.length) {
        isNavigate = true;
        dataObj.push({
          sectionId: 'Not Submitted',
          data: processingProjects,
        });
      }
      if (submittedProjects.length) {
        isNavigate = true;
        dataObj.push({
          sectionId: 'Submitted',
          data: submittedProjects,
        });
      }
      this.setState({
        isNavigate: isNavigate,
        loading: false,
        refreshing: false,
        dataObj,
      });
    }
  };

  deleteProperty = async (propertyAddress) => {
    let data = await getData('PROPERTIES');
    data = JSON.parse(data);
    const updatedData = [];
    let delProperty;
    data.map((property) => {
      if (property.projectId !== propertyAddress.projectId) {
        updatedData.push(property);
      } else {
        delProperty = property;
      }
    });
    saveData('PROPERTIES', JSON.stringify(updatedData));

    let delpictures = [];
    for (var i = 0; i < delProperty.propertyPic.length; i++) {
      for (var j = 0; j < delProperty.propertyPic[i].length; j++) {
        delpictures.push(delProperty.propertyPic[i][j]);
      }
    }
    CameraRoll.deletePhotos(delpictures);
    setTimeout(() => {
      this.getData();
    }, 2000);
    this.setState({ modalVisible: false });
  };

  onPressTrashIcon = async (propertyAddress) => {
    this.setState({
      selectedProperty: propertyAddress,
      modalVisible: true,
      isDelete: true,
    });
  };

  playVideo = () => {
    this.props.navigation.navigate('PlayVideoPage');
  };

  onPressItem = (propertyAddress, status, projectId) => {
    this.props.navigation.navigate('ViewProjectPage', {
      property: propertyAddress,
      uploadStatus: status,
      projectId: projectId,
    });
  };

  renderItem = ({ item }) => {
    console.log('Item', item);
    console.log('homePage', item.projectId);
    const firstImages = item.propertyPic.length ? item.propertyPic[0] : null;
    return (
      <View style={{ marginTop: 2 }}>
        <TouchableOpacity
          style={styles.listItem}
          onPress={() =>
            this.onPressItem(item.title, item.uploadStatus, item.projectId)
          }>
          <View style={styles.subContainer}>
            <Image
              source={{ uri: firstImages ? firstImages[0] : null }}
              style={styles.subImages}
            />
            <Text style={styles.label}>{item.title ? item.title : null}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.trashContainer}
          onPress={() => this.onPressTrashIcon(item)}>
          <Image style={styles.trashStyles} source={images.deleteIcon} />
        </TouchableOpacity>
      </View>
    );
  };

  renderButton = () => {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addProjectButton}
          onPress={this.onPressAddProject}>
          {/* <Image source={images.plusIcon} style={styles.imageIcon} /> */}
          <Text style={styles.ButtonText}>Add Project </Text>
        </TouchableOpacity>
      </View>
    );
  };
  renderNoProject = () => {
    return (
      <View style={styles.NoProjectContainer}>
        <Text style={styles.noProjectText}>
          Press "Add Project" to start a new project. Be sure to watch the "
          <Text style={styles.linkText} onPress={this.playVideo}>
            How to
          </Text>
          " video before you get started.
        </Text>
      </View>
    );
  };

  onPressAddProject = () => {
    this.props.navigation.navigate('AddProjectPage');
  };

  onPressLogout = () => {
    this.setState({
      modalVisible: true,
      isDelete: false,
    });
  };

  onPressOK = async () => {
    this.setState({ modalVisible: false });
    await removeData('USER');
    this.props.navigation.navigate('LoginPage');
  };

  onPressCancel = () => {
    this.setState({ modalVisible: false });
  };

  toggleDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };

  renderModal = () => {
    const { modalVisible, isDelete, selectedProperty } = this.state;
    let title = 'Logout';
    let subTitle = 'Are you sure you want to Logout?';
    if (isDelete) {
      title = 'Delete Project';
      subTitle = 'Are you sure you want to delete project?';
    }
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
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.separator} />
            <Text style={styles.subtitleText}>{subTitle}</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => this.onPressCancel()}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={
                  !isDelete
                    ? () => this.onPressOK()
                    : () => this.deleteProperty(selectedProperty)
                }>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  render() {
    const { dataObj, isNavigate, refreshing, loading, modalVisible } = this.state;
    return (
      <MainFrame>
        <HeaderBarComponent
          noMenu={false}
          isLoading={loading}
          title="my projects"
          rightBtn="Notifications Button"
          rightBtnPress={this.onPressLogout}
          toggle={this.toggleDrawer}
        />
      <View style={styles.mainContainer}>
           {isNavigate ? (
             <SectionList
               sections={dataObj}
               refreshing={refreshing}
               onRefresh={this.getData}
               contentContainerStyle={{ paddingBottom: 100 }}
               renderItem={this.renderItem}
               keyExtractor={(item, index) => item + index}
               renderSectionHeader={({ section }) => (
                 <View style={styles.textContainer}>
                   <Text style={styles.reviewText}>{section.sectionId}</Text>
                 </View>
               )}
             />
           ) : (
             this.renderNoProject()
           )}
           {modalVisible ? this.renderModal() : null}
           {this.renderButton()}
        </View>
      </MainFrame>
    )
  }
}

