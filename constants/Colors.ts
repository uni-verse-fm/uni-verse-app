const tintColorPrimary = '#1BC47D';
const tintColorLightSecondary = '#8f8d8d';
const backgroundLight = '#fff';
const backgroundDark= '#011B27';
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
  light: {
    text: '#000',
    constantText: '#fff',
    background: backgroundLight,
    tint: tintColorPrimary,
    inactiveTint: tintColorLightSecondary,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    constantText: '#fff',
    background: backgroundDark,
    tint: tintColorPrimary,
    inactiveTint: tintColorLightSecondary,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
