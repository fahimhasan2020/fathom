
import React from 'react';
import Video from 'react-native-video';
import images from '../../../../common/Images';
import styles from './styles';
import MainFrame from '../../../../common/components/MainFrame';
import { HeaderBarWithBackComponent } from '../../../../common/widgets/HeaderWidgets';

class PlayVideoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  goBack = () => {
   this.props.navigation.navigate('HomePage');
  }

  toggleDrawer = () => {
    this.props.navigation.navigate('HomePage');
    this.props.navigation.toggleDrawer();
  }

  renderVideo = () => {
    return (
      <Video source={images.videoUrl}
        style={styles.backgroundVideo}
        minLoadRetryCount={3}
        controls={true}
        paused={false}
        fullscreen={true}
        resizeMode='contain'
        onEnd={this.toggleDrawer}
      //   posterResizeMode="cover"
      //   useTextureView={false}
      //  // hideShutterView={false}
      />
    );
  }

  render() {
    return (
      <MainFrame>
        <HeaderBarWithBackComponent
          title="Taking Good Photos"
          goBack={this.goBack}
        />
        { this.renderVideo()}
      </MainFrame>
    );
  }
}
export default PlayVideoPage;
