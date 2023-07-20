import { NavigationActions } from '@react-navigation/native';

export const navigatetoDashboard = () => {
  const navigateAction = NavigationActions.navigate({
    routeName: 'AppNavigator',
    action: NavigationActions.navigate({ routeName: 'HomePage' }),
  });
  return navigateAction;
};
