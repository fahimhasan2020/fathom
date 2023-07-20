
import React from 'react';
import {
  Text,
} from 'react-native';
import styles from './styles';
import MainFrame from '../../../../common/components/MainFrame';
import { HeaderBarComponent } from '../../../../common/widgets/HeaderWidgets';

class PrivacyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleDrawer = () => {
    const { navigation } = this.props;
    navigation.toggleDrawer();
  };

  renderText = () => {
    return (
      <Text style={styles.text}>
        <Text style={styles.textHead}>Privacy Policy: </Text>We will never sell your information to any third party, or give it away for that matter. 
        The only information stored is your name and contact information which is used for your
        personal Client Portal. {"\n"}
        <Text style={styles.textHead}>Usage Rights & License: </Text> Imagery Intelligence LLC (DBA Realty Pro Shots) retains copyright 
        of all imagery, video and stills, that it produces. Unlike other real estate photography
        companies, we provide a full-use license to our clients authorizing them to utilize RPS
        products to aggressively market their own goods and services.At no time can you give away, or sell, the photos to anyone under any circumstance. Any third party wishing to use these photos would need to contact us for Usage Rights.
      </Text>
    );
  }

  render() {
    return (
      <MainFrame>
        <HeaderBarComponent
          noMenu={false}
          title="privacy policy"
          toggle={this.toggleDrawer}
        />
        {this.renderText()}
      </MainFrame>
    );
  }
}
export default PrivacyPage;
