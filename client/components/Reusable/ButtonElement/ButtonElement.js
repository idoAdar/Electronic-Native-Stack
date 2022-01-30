import React from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';

// Components
import TextElement from '../TextElement/TextElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ButtonElement = ({
  title,
  fontSize,
  onPress,
  bgColor,
  titleColor,
  fontWeight,
  isCentered,
  setSpinner,
  customStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.6}>
      <View
        style={{
          ...styles.buttonContainer,
          ...customStyle,
          backgroundColor: bgColor,
        }}>
        {setSpinner ? (
          <ActivityIndicator size={'large'} color={colors.white} />
        ) : (
          <TextElement
            customStyle={{
              color: titleColor,
              fontWeight: fontWeight ? 'bold' : 'normal',
              textAlign: isCentered ? 'center' : 'auto',
              fontSize,
            }}>
            {title}
          </TextElement>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  buttonContainer: {
    width: wp('85%'),
    height: hp('6.4%'),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ButtonElement;
