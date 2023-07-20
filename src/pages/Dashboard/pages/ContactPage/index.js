
import React from 'react';
import {
  Text,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import images from '../../../../common/Images';
import styles from './styles';
import MainFrame from '../../../../common/components/MainFrame';
import { HeaderBarComponent } from '../../../../common/widgets/HeaderWidgets';

class ContactPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };

  openMail = () => {
    Linking.openURL('mailto:Charles@RealtyProShots.com');
  }

  renderImage = () => {
    return (
      <Image
       style={styles.supportImage}
       source={images.supportImage}
      />
    );
  }

  renderText = () => {
    return (
      <Text style={styles.text}>Please let us know if you have issues, questions, or ideas about this app. </Text>
    );
  }

  renderButton = () => {
    return (
    <TouchableOpacity
     style={styles.buttonStyles}
     onPress={this.openMail}
    >
      <Text style={styles.emailText}>support@realtyproshots.com</Text>
    </TouchableOpacity>
    );
  }

  render() {
    return (
      <MainFrame>
        {/* <HeaderBarWithBackComponent
          title="support"
          goBack={this.goBack}
        /> */}
        <HeaderBarComponent
          noMenu={false}
          title="support"
          toggle={this.toggleDrawer}
        />
        {this.renderImage()}
        {this.renderText()}
        {this.renderButton()}
      </MainFrame>
    );
  }
}
export default ContactPage;
