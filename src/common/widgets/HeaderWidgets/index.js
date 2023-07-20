import React from 'react';
import { Text, View, Image, TouchableOpacity,StatusBar } from 'react-native';
import { i18strings } from '../../locales/i18n';
import { commonStyle as cs } from '../../styles';
import Feather from "react-native-vector-icons/Feather"
import images from '../../Images';
import {
  navBarStyle as nbs,
  headerComponentStyle as hcs,
  headerComponentTwoStyle as hc2s,
  headerComponentThreeStyle as hc3s,
  headerBarComponentStyle as hbcs,
  headerBarWithBackComponentStyle as hbwbcs
} from './styles';

export const HeaderComponent = props => {
  const { goBack, title, accessible, accessibilityLabel } = props;
  return (
    <View style={hcs.container}>
      <TouchableOpacity
        onPress={goBack}
        style={{
          flexDirection: 'row'
        }}
        accessible={accessible}
        accessibilityLabel={i18strings('accessibility.backBtn')}
      >
        <Image source={images.backIcon} style={cs.backIcon} />
        <Text
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
          style={[cs.backTitle, { marginLeft: 10 }]}
        >
          {' '}
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const HeaderComponentTwo = props => {
  const {
    toggle,
    title,
    goForward,
    stepsText,
    accessible,
    accessibilityLabel
  } = props;
  return (
    <View style={hc2s.container}>
      <TouchableOpacity
        onPress={toggle}
        style={{
          flexDirection: 'row'
        }}
        accessible={accessible}
        accessibilityLabel={i18strings('accessibility.backBtn')}
      >
        <Image source={images.backIcon} style={cs.backIcon} />
        <Text
          style={cs.backTitle}
          accessible={accessible}
          accessibilityLabel={accessibilityLabel}
        >
          {'  '}
          {title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goForward}>
        <Text
          style={cs.nextTitle}
          accessible={accessible}
          accessibilityLabel={stepsText}
        >
          {stepsText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const HeaderComponentThree = props => {
  const { goBack, title, accessible, accessibilityLabel, notOtpPage } = props;
  return (
    <View
      style={hc3s.container}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      <TouchableOpacity
        onPress={goBack}
        style={hc3s.closeContainer}
        accessible={accessible}
        accessibilityLabel={i18strings('accessibility.backBtn')}
      >
        <View>
          <Image source={images.closeIcon} style={hc3s.closeImage} />
        </View>
        <View>
          <Text style={!notOtpPage ? cs.backTitle : hc3s.boldFont}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const HeaderComponentFour = props => {
  const { title, accessible, accessibilityLabel } = props;
  return (
    <View
      style={hc3s.container}
      accessible={accessible}
      accessibilityLabel={accessibilityLabel}
    >
      <View
        style={hc3s.closeContainer}
        accessible={accessible}
        accessibilityLabel={i18strings('accessibility.backBtn')}
      >
        <Image source={images.error} />
        <Text style={hc3s.failTitle}>{title}</Text>
      </View>
    </View>
  );
};

export const HeaderBarComponent = props => {
  const {
    toggle,
    title,
    searchBtn,
    rightBtnPress,
    searchBtnTitle,
    rightBtn,
    iconOnRight,
    noMenu
  } = props;
  let searchBtnFlag = false;
  if (searchBtn) {
    searchBtnFlag = true;
  }
  return (
    <View style={hbcs.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      {noMenu ? null : (
        <TouchableOpacity
          style={hbcs.innerContainer}
          onPress={toggle}
          accessible
          
        >
          {/* <Image source={images.barIcon} style={hbcs.imageIcon} /> */}
          <Feather name="align-left" size={23} color={'#323233'} />
        </TouchableOpacity>
      )}
      <Text
        style={hbcs.titleText}
        accessible
      >
        {title}
      </Text>
      {!searchBtnFlag && iconOnRight ? null : (
        <TouchableOpacity
          style={hbcs.searchContainer}
          onPress={rightBtnPress}
          accessible
          accessibilityLabel={rightBtn}
        >
          <Text style={hbcs.searchBtnTitle}>{searchBtnTitle}</Text>
        </TouchableOpacity>
      )}
      {!iconOnRight ? null : (
        <TouchableOpacity
          style={hbcs.searchContainer}
          onPress={rightBtnPress}
          accessible
          accessibilityLabel={rightBtn}
        >
          <Image source={iconOnRight} style={hbcs.imageBackIcon}/>
        </TouchableOpacity>
      )}
    </View>
  );
};

export const NavBarComponent = props => {
  const {
    toggle,
    logoPress,
    iconRightOne,
    iconRightTwo,
    iconRightOnePress,
    iconRightTwoPress,
    notificationsCount
  } = props;
  return (
    <View style={nbs.container}>
      <TouchableOpacity
        style={nbs.innerContainer}
        onPress={toggle}
        accessible
        
      >
        <Image source={images.menuNew} />
      </TouchableOpacity>
      <TouchableOpacity onPress={logoPress}>
        <Image source={images.logoMono} />
      </TouchableOpacity>
      {!iconRightOne ? null : (
        <TouchableOpacity
          style={nbs.iconOneContainer}
          onPress={iconRightOnePress}
          accessible
          
        >
          <Image source={iconRightOne} />
      </TouchableOpacity>
      )}
      {!iconRightTwo ? null : (
        <TouchableOpacity
          style={nbs.iconTwoContainer}
          onPress={iconRightTwoPress}
          accessible
          
        >
          <Image source={iconRightTwo} />
          {!notificationsCount ? null : <Text style={nbs.notificationText}>{notificationsCount}</Text>}
        </TouchableOpacity>
      )}
    </View>
  );
};

export const HeaderBarWithBackComponent = props => {
  const {
    goBack,
    title,
    accessible,
    accessibilityLabel,
    rightBtnPress,
    rightBtn,
    iconOnRight,
    buttonTitle,
  } = props;
  return (
    <View style={hbcs.container}>
      <TouchableOpacity
        style={hbcs.innerContainer}
        onPress={goBack}
        accessible={accessible}
        accessibilityLabel={accessibilityLabel}
      >
         <Image source={images.backImage} style={hbcs.imageBackIcon}/>
      </TouchableOpacity>
      <View style={{ width: '55%' }}>
        <Text
          numberOfLines={1}
          style={hbcs.titleText}
          
        >
          {title}
        </Text>
      </View>
      {!iconOnRight ? <Text style={hbcs.rightButtonText}
       onPress={rightBtnPress}>{buttonTitle}</Text> : (
       <TouchableOpacity
       style={hbcs.searchContainer}
       onPress={rightBtnPress}
       accessible
       accessibilityLabel={rightBtn}
     >
       <Image source={iconOnRight} style={hbcs.imageIcon}/>
     </TouchableOpacity>
      )}
    </View>
  );
};
