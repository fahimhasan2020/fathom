import React, { Component } from 'react';
import {
  View,
  Image,
  Modal,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { commonStyle as cs } from '../../styles';
import {
  HeaderBarWithBackComponent,
  RenderLoading,
  RenderFooter,
  RenderNoResults
} from '../../widgets/index';
import MainFrame from '../MainFrame';
import { i18strings } from '../../locales/i18n';
import { logException } from '../../Helper';
import getForms from './Api';
import afms from './styles';
import colors from '../../Colors';
import images from '../../Images';

export default class AttachFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      addingMore: false,
      hasMore: false,
      currentPage: 1,
      startPage: 0,
      forms: [],
    };
  }

  componentDidMount = () => {
    this.fetchPosts();
  };

  adjustFormData = form => {
    const { selectedForms } = this.props;
    const results = selectedForms.filter(formItem => formItem.id === form.id);
    return {
      ...form,
      value: results.length > 0 ? true : false
    };
  };

  fetchPosts = async () => {
    try {
      const { authToken, workspaceID } = this.props;
      const {
        forms,
        startPage,
        currentPage,
        refreshing,
        loading
      } = this.state;
      if (!loading) {
        this.setState({ loading: true });
        const getFormsResponse = await getForms(
          currentPage,
          startPage,
          workspaceID,
          authToken
        );
        if (getFormsResponse.success) {
          const getFormsData = getFormsResponse.data;
          console.log('getFormsResponse: ', getFormsResponse);
          const formsData = getFormsData.map(this.adjustFormData);
          const updatedForms = refreshing ? formsData : forms.concat(formsData);
          this.setState({
            forms: updatedForms,
            hasMore: updatedForms.length < getFormsResponse.total,
            currentPage: currentPage + 1,
            startPage: updatedForms.length,
            refreshing: false
          });
        }
        this.setState({ loading: false });
      }
    } catch (err) {
      this.setState({ loading: false });
      logException(`AttachFormModal / fetchPosts / ${err.message}`);
    }
  };

  addPosts = () => {
    const { refreshing } = this.state;
    if (!refreshing) {
      this.setState({
        hasMore: true
      }, () => {
        this.fetchPosts();
      });
    }
  };

  onRefresh = () => {
    const { refreshing } = this.state;
    if (!refreshing) {
      this.setState({
        refreshing: true,
        currentPage : 1,
        startPage: 0,
        forms: []
      }, () => {
        this.fetchPosts();
      });
    }
  };

  keyExtractor = (item, index) => index.toString();

  selectFormData = (form, id) => {
    if (form.id === id) {
      return {
        ...form,
        value: !form.value
      };
    }
    return form;
  };

  selectForm = id => {
    this.setState((prevState) => {
      const forms = [...prevState.forms];
      const newForms = forms.map(form => this.selectFormData(form, id));
      return {
        forms: newForms
      };
    });
  };

  renderForms = props => {
    const { item } = props;
    const { title, value } = item;
    const { viewForm } = this.props;
    return (
      <View key={title} style={cs.formsListItem}>
        <TouchableOpacity
          accessibilityLabel={
            value
              ? `${title} ${i18strings('accessibility.selected')}`
              : `${title} ${i18strings('accessibility.notSelected')}`
          }
          onPress={() => this.selectForm(item.id)}
          style={[cs.listCheckBox, afms.listCheckBox]}
        >
          <Image
            style={afms.checkboxIcon}
            source={value ? images.tickSelected : images.tickUnselected}
          />
          <Text style={cs.formListText}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => viewForm(item)}
          style={afms.showIconContainer}
        >
          <Image
            accessibilityLabel={`${i18strings(
              'accessibility.detailsBtn'
            )} ${title}`}
            style={afms.eyeIcon}
            source={images.eye}
          />
        </TouchableOpacity>
      </View>
    );
  };

  saveForms = () => {
    const { forms } = this.state;
    const { save } = this.props;
    const selectedForm = forms.filter(form => form.value === true);
    if (selectedForm.length > 0) {
      save(selectedForm);
    } else {
      this.parent.ShowToast(`${i18strings('errors.selectForms')}`);
    }
  };

  render() {
    const { modalVisible, close } = this.props;
    const { forms, refreshing, loading, addingMore } = this.state;
    return (
      <Modal style={afms.container} isVisible={modalVisible}>
        <MainFrame
          backgroundColor={colors.tealBlue}
          ref={parent => {
            this.parent = parent;
          }}
        >
          <View style={cs.container}>
            <HeaderBarWithBackComponent
              savePress={this.saveForms}
              saveBtn={i18strings('find.save')}
              backTitle={i18strings('components.close')}
              title={i18strings('find.attachForms')}
              goBack={close}
              addnewLabel={i18strings('accessibility.saveBtn')}
              accessibilityLabel={i18strings('accessibility.closeBtn')}
            />
            <FlatList
              style={cs.fullWidth}
              data={forms}
              keyExtractor={this.keyExtractor}
              renderItem={this.renderForms}
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
            />
          </View>
        </MainFrame>
      </Modal>
    );
  }
}
