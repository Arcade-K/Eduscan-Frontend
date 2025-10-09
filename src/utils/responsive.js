import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Guideline sizes are based on standard ~375x812 (iPhone X)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const scale = (size) => (width / guidelineBaseWidth) * size;
export const verticalScale = (size) => (height / guidelineBaseHeight) * size;
export const moderateScale = (size, factor = 0.5) => size + (scale(size) - size) * factor;

// optional: normalize font size (accounts for PixelRatio)
export const normalizeFont = (size) => {
  const newSize = moderateScale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export default { scale, verticalScale, moderateScale, normalizeFont };
