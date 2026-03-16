import { Dimensions } from 'react-native';

export const DESIGN_WIDTH = 390;
export const DESIGN_HEIGHT = 844;

export const getAdaptiveWidth = (
  size: number,
  currentWidth = Dimensions.get('window').width,
) => size * (currentWidth / DESIGN_WIDTH);

export const getAdaptiveHeight = (
  size: number,
  currentHeight = Dimensions.get('window').height,
) => size * (currentHeight / DESIGN_HEIGHT);
