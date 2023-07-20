import React, { Component } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
const fetch = require('react-native-cancelable-fetch');
import {
  RenderLoading,
  RenderFooter,
  RenderNoResults,
} from '../../widgets/CommonWidgets';
import MainFrame from '../MainFrame';
import { HeaderBarWithBackComponent } from '../../widgets/HeaderWidgets';
import { i18strings } from '../../locales/i18n';
import { logException, setVisibilityData, showInitials } from '../../Helper';

import getWorkspaces from '../../api/GetWorkspaces';
import styles from './styles';
import { commonStyle as cs } from '../../styles';
import colors from '../../Colors';
import images from '../../Images';
import Input from '../Input';

export default class VisibilityModal extends Component {
  constructor(props) {
    super(props);
    const { selectedPersons: secondArray } = this.props;
    this.state = {
      refreshing: false,
      loading: false,
      addingMore: false,
      hasMore: false,
      currentPage: 1,
      startPage: 0,
      visibilityOptions: [],
      filterInput: '',
      selectedPersons: secondArray.concat([]),
      includePublicWorkspaces: true
    };
    this.saveVisibilityOptions = this.saveVisibilityOptions.bind(this);
  }

  componentDidMount = () => {
    this.fetchPosts();
  };

  adjustVisibilityData = option => {
    const obj = {
      ...option,
      value: false
    };
    return obj;
  };

  fetchPosts = async () => {
    try {
      const {
        loading,
        refreshing,
        startPage,
        currentPage,
        filterInput,
        includePublicWorkspaces,
        visibilityOptions
      } = this.state;
      const { authToken, workspaceID } = this.props;
      if (!loading) {
        this.setState({ loading: true });
        const getWorkspacesResponse = await getWorkspaces(
          currentPage,
          startPage,
          workspaceID,
          authToken,
          filterInput,
          includePublicWorkspaces
        );
        console.log('getWorkspacesResponse', getWorkspacesResponse);
        if (getWorkspacesResponse.success) {
          const getWorkspacesData = getWorkspacesResponse.data;
          const workspacesData = getWorkspacesData.map(this.adjustVisibilityData);
          const updatedOptions = refreshing ? visibilityOptions : visibilityOptions.concat(workspacesData);
          this.setState({
            visibilityOptions: updatedOptions,
            hasMore: getWorkspacesData.length < 10 ? false : true,
            startPage: updatedOptions.length,
            currentPage: currentPage + 1,
            refreshing: false,
            addingMore: false
          });
        }
        this.setState({ loading: false });
      } else {
        fetch.abort('searchApi');
        this.setState({ loading: false }, () => this.fetchPosts());
      }
    } catch (err) {
      this.setState({ loading: false });
      logException(`VisibilityModal / fetchPosts / ${err.message}`);
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
        startPage: 0,
        currentPage: 1,
        visibilityOptions: []
      }, () => {
        this.fetchPosts();
      });
    }
  };

  keyExtractor = (item, index) => index.toString();

  saveVisibilityOptions = () => {
    const { /* visibilityOptions, */selectedPersons } = this.state;
    const { select } = this.props;
    /* const selectedOptions = visibilityOptions.filter(
      option => option.value === true
    );
    if (selectedOptions.length > 0) {
      select(selectedOptions);
    } else {
      this.parent.ShowToast(`${i18strings('errors.whoCanSee')}`);
    } */
    if (selectedPersons.length > 0) {
      select(selectedPersons);
    } else {
      this.parent.ShowToast(`${i18strings('errors.whoCanSee')}`);
    }
  };

  selectWhoForOption = item => {
    const { select } = this.props;
    select([item]);
  };

  deselect = item => {
    const { selectedPersons, deselect } = this.props;
    console.log('selectedPersons: ', selectedPersons, 'item: ', item);
    if (selectedPersons.length) {
      const results = selectedPersons.filter(data => data.id !== item.id);
      deselect(results);
    }
  };

  selectVisibilityData = (option, id) => {
    if (option.id === id) {
      this.setState((prevState) => {
        let temp = [...prevState.selectedPersons];
        if (option.value) {
          this.deselect(option);
          temp = temp.filter(opt => opt.id !== option.id);
        } else {
          if (temp.length && (temp[0].id === 'PUB' || temp[0].id === 'ONM')) {
            temp.shift();
          }
          temp.push(option);
        }
        console.log('temp: ', temp);
        return {
          selectedPersons: temp
        };
      });
      return {
        ...option,
        value: !option.value
      };
    }
    return option;
  };

  selectVisibilityOption = item => {
    const { visibilityOptions } = this.state;
    const newOptions = visibilityOptions.map(option =>
      this.selectVisibilityData(option, item.id)
    );
    this.setState({
      visibilityOptions: newOptions
    });
  };

  isSelected = (id, index) => {
    const { selectedPersons } = this.state;
    let temp = selectedPersons;
    temp = temp.filter(opt => opt.id === id);
    if (temp.length) {
      this.setState((prevState) => {
        const tempArray = [...prevState.visibilityOptions];
        tempArray[index].value = true;
        return {
          visibilityOptions: tempArray
        };
      });
      return true;
    } else {
      return false;
    }
  }

  renderVisibilityOptions = props => {
    const { item, index } = props;
    const { value, name, id, profileInfo } = item;
    const { checkBoxFlag } = this.props;
    let avatar = null;
    if (profileInfo.avatarImagePathUrl) {
      avatar = { uri: profileInfo.avatarImagePathUrl };
    }
    const isChecked = !value ? this.isSelected(id, index) : value;
    if (checkBoxFlag) {
      return (
        <TouchableOpacity
          key={index.toString()}
          style={styles.optionContainer}
          onPress={() => this.selectWhoForOption(item)}
        >
          {!avatar ? (
            <View style={[cs.firstLetterContainer, { marginLeft: 20 }]}>
              <Text style={cs.firstLetterText}>
                {showInitials(name)}
              </Text>
            </View>
          ) : (
            <Image
              style={styles.avatarImage}
              source={avatar}
            />
          )}
          <Text style={styles.optionText}>{name}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        key={index.toString()}
        style={styles.optionContainer}
        onPress={() => this.selectVisibilityOption(item)}
        accessibilityLabel={
          isChecked
            ? `${name} ${i18strings('accessibility.checked')}`
            : `${name} ${i18strings('accessibility.unchecked')}`
        }
      >
        <Image
          style={styles.checkboxIcon}
          source={isChecked ? images.tickSelected : images.tickUnselected}
        />
        {!avatar ? (
          <View style={[cs.firstLetterContainer, { marginLeft: 20 }]}>
            <Text style={cs.firstLetterText}>
              {showInitials(name)}
            </Text>
          </View>
        ) : (
          <Image
            style={styles.avatarImage}
            source={avatar}
          />
        )}
        <Text style={styles.optionText}>{name}</Text>
      </TouchableOpacity>
    );
  };

  selectVisibilityPrivacyOption = option => {
    const { select } = this.props;
    console.log(option);
    // select([{ id: option.valueCode, name: option.descriptionText }]);
    select([setVisibilityData(option)]);
  };

  renderHeader = () => {
    const { PrivacyOptions, headerFlag, showOnlyMe } = this.props;
    if (!headerFlag) {
      return null;
    }
    return (
      <View>
        {PrivacyOptions.map(option => {
          if (showOnlyMe && (option.descriptionText === 'Anyone' || option.descriptionText === 'All Members In Workspace')) {
            return null;
          }
          return (
            <TouchableOpacity
              key={option.descriptionText}
              style={styles.optionContainer}
              onPress={() => this.selectVisibilityPrivacyOption(option)}
              accessibilityLabel={`${i18strings(
                'accessibility.visibilityOption'
              )} ${option.descriptionText}`}
            >
              <Text style={styles.headerOptionText}>
                {option.descriptionText}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  onValueChange = value => {
    const valueLength = value.length;
    if (valueLength === 0) {
      this.setState({
        filterInput: '',
        currentPage: 1,
        startPage: 0,
        hasMore: true,
        visibilityOptions: []
      }, () => {
        this.fetchPosts();
      });
    } else if (valueLength > 2) {
      this.setState({
        filterInput: value,
        currentPage: 1,
        startPage: 0,
        hasMore: true,
        visibilityOptions: []
      }, () => {
        this.fetchPosts();
      });
    }
  };

  checkBoxPressed = () => {
    const { includePublicWorkspaces } = this.state;
    this.setState({
        includePublicWorkspaces: !includePublicWorkspaces,
        currentPage: 1,
        startPage: 0,
        hasMore: true,
        visibilityOptions: []
      }, () => this.fetchPosts());
  }

  renderInputField = () => {
    const { filterInput } = this.state;
    const accessibleFlag = true;
    const hasAutoCorrectEnabled = true;
    return (
      <Input
        accessible={accessibleFlag}
        accessibilityLabel={i18strings('accessibility.searchVisibility')}
        // error={errors[key]}
        value={filterInput}
        // icon={icon}
        // iconStyle={iconStyle}
        // ref={this.addInput(key)}
        onChange={this.onValueChange}
        // onSubmit={this.onSubmit(onSubmitKey)}
        label={i18strings('servicesPage.search')}
        editable={accessibleFlag}
        returnKeyType="done"
        secureTextEntry={false}
        autoCorrect={hasAutoCorrectEnabled}
      />
    );
  };

  renderPublicWorspacesCheckbox = () => {
    const { includePublicWorkspaces } = this.state;
    return (
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={this.checkBoxPressed}
        accessibilityLabel={
          includePublicWorkspaces
            ? `${i18strings('components.workspaces')} ${i18strings(
                'accessibility.checked'
              )}`
            : `${i18strings('components.workspaces')} ${i18strings(
                'accessibility.unchecked'
              )}`
        }
      >
        <View style={styles.checkBoxInnerContainer}>
          <Image
            style={styles.checkboxIcon}
            source={
              includePublicWorkspaces
                ? images.tickSelected
                : images.tickUnselected
            }
          />
        </View>
        <View>
          <Text style={styles.optionText}>
            {i18strings('components.workspaces')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { close, title, checkBoxFlag } = this.props;
    const { visibilityOptions, refreshing, loading, addingMore } = this.state;
    return (
      <MainFrame
        backgroundColor={colors.tealBlue}
        ref={parent => {
          this.parent = parent;
        }}
      >
        <View style={cs.container}>
          <HeaderBarWithBackComponent
            savePress={checkBoxFlag ? null : this.saveVisibilityOptions}
            saveBtn={checkBoxFlag ? null : i18strings('find.save')}
            backTitle={i18strings('components.back')}
            title={title}
            goBack={close}
            accessibilityLabel={i18strings('accessibility.backBtn')}
            addnewLabel={i18strings('accessibility.saveBtn')}
          />
          {this.renderInputField()}
          {this.renderPublicWorspacesCheckbox()}
          <FlatList
            style={cs.marginTop}
            data={visibilityOptions}
            keyExtractor={this.keyExtractor}
            ListHeaderComponent={this.renderHeader}
            renderItem={this.renderVisibilityOptions}
            ListEmptyComponent={
              loading ? (
                <RenderLoading
                  text={i18strings('collaboratePage.loadingGuests')}
                />
              ) : refreshing ? null : (
                <RenderNoResults
                  text={i18strings('collaboratePage.noResults')}
                />
              )
            }
            ListFooterComponent={
              addingMore && visibilityOptions.length ? (
                <RenderFooter
                  text={i18strings('collaboratePage.loadingMore')}
                />
              ) : null
            }
            onRefresh={this.onRefresh}
            refreshing={refreshing}
            onEndReached={this.addPosts}
          />
        </View>
      </MainFrame>
    );
  }
}
