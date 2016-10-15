import { fade } from 'material-ui/utils/colorManipulator';
import { spacing, colors } from 'material-ui/styles';

export default {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.grey900,
    primary2Color: colors.grey900,
    primary3Color: colors.grey600,
    accent1Color: colors.grey500,
    accent2Color: colors.grey500,
    accent3Color: colors.grey100,
    textColor: colors.fullWhite,
    secondaryTextColor: fade(colors.fullWhite, 0.7),
    alternateTextColor: '#303030',
    canvasColor: '#303030',
    borderColor: fade(colors.fullWhite, 0.3),
    disabledColor: fade(colors.fullWhite, 0.3),
    pickerHeaderColor: fade(colors.fullWhite, 0.12),
    clockCircleColor: fade(colors.fullWhite, 0.12),
  },
};
