import { StyleSheet, Text, View, StatusBar, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import configureStore from './src/AppStore';
import React, { Component } from 'react'
import { Provider, connect } from 'react-redux';
import Toast from 'react-native-toast-message';
import { LandingPage, HomePage, LoginPage, AddProjectPage, CameraPage, ShowCapturedImagePage, ViewProjectPage, SubmitProjectPage, ContactPage, PlayVideoPage, PrivacyPage, SplashPage, IntroPage } from './src/pages/index'
import AppDrawer from './src/common/navigation/AppDrawer';
const store = configureStore();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function DashboardNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
      gestureEnabled: false,
    }}>
      <Stack.Screen name="SplashPage" component={SplashPage} />
      <Stack.Screen name="IntroPage" component={IntroPage} />
      <Stack.Screen name="LoginPage" component={LoginPage} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="AddProjectPage" component={AddProjectPage} />
      <Stack.Screen name="CameraPage" component={CameraPage} />
      <Stack.Screen name="ShowCapturedImagePage" component={ShowCapturedImagePage} />
      <Stack.Screen name="ViewProjectPage" component={ViewProjectPage} />
      <Stack.Screen name="SubmitProjectPage" component={SubmitProjectPage} />
      <Stack.Screen name="ContactPage" component={ContactPage} />
      <Stack.Screen name="PlayVideoPage" component={PlayVideoPage} />
      <Stack.Screen name="PrivacyPage" component={PrivacyPage} />
    </Stack.Navigator>
  );
}


export default class App extends Component {
  render() {
    return (<Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <AppDrawer navigation={props.navigation} />}
          screenOptions={{ headerShown: false, gestureEnabled: false ,swipeEnabled:false}}>
          <Drawer.Screen name="DashboardNavigator" component={DashboardNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>)
  }
}


const styles = StyleSheet.create({})