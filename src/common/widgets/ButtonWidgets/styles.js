import { StyleSheet } from 'react-native';
import colors from '../../Colors';
import { font } from '../../styles';

export const menuButtonsStyle = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  contentContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  titleText: {
    ...font(16),
    color: colors.menuTextColor
  },
  imageContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const subMenuButtonsStyle = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainer: {
    flex: 2.5,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 7.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 15
  },
  titleText: {
    ...font(16),
    color: colors.menuTextColor
  }
});
