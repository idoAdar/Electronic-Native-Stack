import React from 'react';
import {Text} from 'react-native';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

const TextElement = ({customStyle, children}) => {
  return <Text style={{...styles.default, ...customStyle}}>{children}</Text>;
};

const styles = EStyleSheet.create({
  default: {
    fontSize: '1rem',
    color: colors.regular,
    fontFamily: 'Poppins-Regular',
  },
});

export default TextElement;
