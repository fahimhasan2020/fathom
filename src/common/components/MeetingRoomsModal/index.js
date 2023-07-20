import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Linking,
  Platform,
  FlatList,
  BackHandler,
  TouchableOpacity
} from 'react-native';
import { PropTypes } from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { font, commonStyle as cs } from '../../styles';
import {
  HeaderBarWithBackComponent,
  RenderLoading,
  RenderFooter,
  RenderNoResults,
  RoomByTitle
} from '../../widgets/index';
import MainFrame from '../MainFrame';
import MoreButton from '../MoreButton';
import { RoomsFilterModal } from '../../widgets/ModalWidgets';
import { i18strings } from '../../locales/i18n';
import { logException } from '../../Helper';
import getRooms from './Api';
import mrms from './styles';
import colors from '../../Colors';
import images from '../../Images';

export default class MeetingRoomsModal extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  static defaultProps = {
    navigation: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      filterValue: '',
      refreshing: false,
      loading: false,
      addingMore: false,
      hasMore: false,
      currentPage: 1,
      startPage: 0,
      meetingRooms: [],
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    if (!navigation) {
      this.fetchPosts();
    } else {
      this.focusListener = navigation.addListener('didFocus', () => {
        // The screen is focused
        // Call any action
        this.setState({
          currentPage: 1,
          startPage: 0,
          meetingRooms: []
        }, () => this.fetchPosts());
      });
    }
  };

  componentWillUnmount() {
    // Remove the event listener
    const { navigation } = this.props;
    if (navigation) {
      this.focusListener.remove();
    }
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    const { navigation, close } = this.props;
    if (navigation) {
      close();
      return true;
    }
  }

  adjustRoomData = room => {
    const obj = {
      ...room,
      value: false
    };
    return obj;
  };

  fetchPosts = async () => {
    try {
      const {
        filterValue,
        startPage,
        currentPage,
        refreshing,
        meetingRooms,
        loading
      } = this.state;
      const { authToken, workspaceID } = this.props;
      if (!loading) {
        this.setState({ loading: true });
        const getRoomsResponse = await getRooms(
          currentPage,
          startPage,
          workspaceID,
          authToken,
          filterValue
        );
        console.log('getRoomsResponse: ', getRoomsResponse);
        if (getRoomsResponse.success) {
          const getRoomsData = getRoomsResponse.data;
          const roomsData = getRoomsData.map(this.adjustRoomData);
          const updatedRooms = refreshing ? meetingRooms : meetingRooms.concat(roomsData);
          this.setState({
            meetingRooms: updatedRooms,
            hasMore: getRoomsData.length < 10 ? false : true,
            startPage: updatedRooms.length,
            currentPage: currentPage + 1,
            refreshing: false,
            addingMore: false
          });
        }
        this.setState({ loading: false });
      }
    } catch (err) {
      this.setState({ loading: false });
      logException(`MeetingRoomsModal / fetchPosts / ${err.message}`);
    }
  };

  addPosts = () => {
    const { hasMore } = this.state;
    if (hasMore) {
      this.setState({
        addingMore: true
      }, () => this.fetchPosts());
    }
  };

  onRefresh = () => {
    const { refreshing } = this.state;
    if (!refreshing) {
      this.setState({
        hasMore: true,
        currentPage: 1,
        startPage: 0,
        meetingRooms: []
      }, () => {
        this.fetchPosts();
      });
    }
  };

  keyExtractor = (item, index) => index.toString();

  onRoomSelect = async (item) => {
    const { selectedRooms, selectRoom, navigation } = this.props;
    if (navigation) {
      const temp = item.url.split('https://');
      Linking.canOpenURL(item.url).then(supported => {
        if (supported) {
          if (Platform.OS === 'ios') {
            Linking.openURL(`googlechrome://${temp[1]}`).catch(err => {
              console.log('err: ', err);
              Linking.openURL(item.url);
            });
          } else {
            Linking.openURL(item.url);
          }
        } else {
          Linking.openURL(item.url);
        }
      });
    }
    const results = selectedRooms.filter(room => room.id === item.id);
    if (results.length > 0) {
      this.parent.ShowToast(`${i18strings('errors.roomselected')}`);
    } else {
      selectRoom(item);
    }
  };

  editPressed = item => {
    const { navigation } = this.props;
    if (navigation) {
      navigation.navigate('CreateRoomPage', { item });
    }
  }

  selectValue = value => {
    this.setState(
      {
        filterValue: value,
        currentPage: 1,
        startPage: 0,
        meetingRooms: []
      },
      () => {
        this.toggleFiltersModal();
        this.fetchPosts();
      }
    );
  };

  toggleFiltersModal = () => {
    const { showFiltersModal } = this.state;
    this.setState({
      showFiltersModal: !showFiltersModal
    });
  };

  renderFiltersModal = () => {
    const { showFiltersModal } = this.state;
    return (
      <RoomsFilterModal
        modalVisible={showFiltersModal}
        close={this.toggleFiltersModal}
        select={this.selectValue}
      />
    );
  };

  renderRooms = props => {
    const { item } = props;
    const privatePublicLabel = isPublic
      ? i18strings('accessibility.public')
      : i18strings('accessibility.private');
    const { name, isPublic, editable } = item;
    return (
      <LinearGradient
        colors={['#ffffff', '#fcfcfc']}
        style={mrms.gradientStyles}
      >
        <TouchableOpacity
          accessible={false}
          onPress={() => this.onRoomSelect(item)}
          style={cs.flexOneContainer}
        >
          <View style={mrms.topRow}>
            <View
              style={[
                mrms.contentContainer,
                {
                  backgroundColor: !isPublic
                    ? colors.privateBg
                    : colors.publicBg,
                  borderColor: !isPublic
                    ? colors.privateBorder
                    : colors.publicBorder,
                },
              ]}
            >
              <Text
                style={{
                  ...font(10, 'Bold'),
                  color: !isPublic ? colors.privateBorder : colors.publicBorder,
                }}
                accessible
                accessibilityLabel={privatePublicLabel}
              >
                {isPublic ? 'PUBLIC' : 'PRIVATE'}
              </Text>
            </View>
            {!editable ? null : (
              <TouchableOpacity
                style={mrms.btnPadding}
                onPress={() => this.editPressed(item)}
              >
                <Image source={images.create} />
              </TouchableOpacity>
            )}
          </View>
          <Text
            style={mrms.titleText}
            accessible
            accessibilityLabel={`${i18strings('accessibility.meetingName')}${
              item.name
            }`}
            numberOfLines={2}
          >
            {name}
          </Text>
          <RoomByTitle item={item} />
          <Text
            style={cs.postInfoText}
            accessible
            accessibilityLabel={`${i18strings('accessibility.attendees')}${
              item.guest_Count
            }`}
          >
            {item.guest_Count}
            {' Attendees'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  };

  getFilterValue = () => {
    const { filterValue } = this.state;
    if (filterValue === 'OWNED') {
      return i18strings('components.ownedRooms');
    } else {
      return i18strings('components.sharedRooms');
    }
  }

  render() {
    const { close, createRoom, navigation } = this.props;
    const {
      meetingRooms,
      filterValue,
      refreshing,
      loading,
      addingMore
    } = this.state;
    const arrowDown = true;
    return (
      <MainFrame
        // isLoading={loading}
        backgroundColor={colors.tealBlue}
        ref={parent => {
          this.parent = parent;
        }}
        showBottomTab={true}
        navigation={navigation}
        currentScreenProps={this.props}
      >
        <View style={cs.container}>
          <HeaderBarWithBackComponent
            savePress={createRoom}
            saveBtn={i18strings('find.addNew')}
            backTitle={i18strings('components.back')}
            title={i18strings('find.meetingRooms')}
            goBack={close}
            accessibilityLabel={i18strings('accessibility.backBtn')}
            addnewLabel={i18strings('accessibility.addNewBtn')}
          />
          <View style={mrms.centerAligned}>
            <MoreButton
              arrowDown={arrowDown}
              nullText={!filterValue ? 'All' : this.getFilterValue()}
              label={i18strings('collaboratePage.showRooms')}
              onPress={this.toggleFiltersModal}
              accessibilityLabel={i18strings('accessibility.filterTasks')}
            />
            <FlatList
              style={mrms.containerMargin}
              data={meetingRooms}
              numColumns={2}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderRooms}
              ListEmptyComponent={
                loading ? (
                  <RenderLoading
                    text={i18strings('collaboratePage.loadingPosts')}
                  />
                ) : refreshing ? null : (
                  <RenderNoResults
                    text={i18strings('collaboratePage.noResults')}
                  />
                )
              }
              ListFooterComponent={
                addingMore ? (
                  <RenderFooter
                    text={i18strings('collaboratePage.loadingMore')}
                  />
                ) : null
              }
              onRefresh={this.onRefresh}
              refreshing={refreshing}
              onEndReached={this.addPosts}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
        {this.renderFiltersModal()}
      </MainFrame>
    );
  }
}
