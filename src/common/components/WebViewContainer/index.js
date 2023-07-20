import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoHeightWebView from 'react-native-autoheight-webview';
import { commonStyle as cs } from '../../styles';

export default class WebViewContainer extends Component {
  static propTypes = {
    style: PropTypes.any,
    source: PropTypes.any,
    deletedIndc: PropTypes.bool,
    onSizeUpdated: PropTypes.any,
    description: PropTypes.string,
    onNavigationEvent: PropTypes.func
  };

  static defaultProps = {
    style: null,
    description: '',
    deletedIndc: false,
    source: { html: '' },
    onSizeUpdated: () => {},
    onNavigationEvent: () => {},
  };

  render() {
    const {
      style,
      source,
      description,
      deletedIndc,
      onSizeUpdated,
      onNavigationEvent
    } = this.props;
    return (
      <AutoHeightWebView
        source={source}
        ref={ref => (this.webview = ref)}
        useWebKit={true}
        originWhitelist={['*']}
        shouldStartLoad={false}
        onSizeUpdated={onSizeUpdated}
        style={!style ? [cs.transparentBackground, !deletedIndc ? null : cs.disabledView ] : style}
        onNavigationStateChange={(webEvent) => onNavigationEvent(webEvent, this.webview, description)}
      />
    );
  }
}
