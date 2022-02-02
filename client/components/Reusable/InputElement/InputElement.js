import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';

// Components
import TextElement from '../TextElement/TextElement';

// Styles
import EyeIcon from '../../../assets/icons/hide.svg';
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const InputElement = ({
  inputValue,
  onType,
  onBlur,
  errorMsg,
  keyboard,
  holder,
  isSecure,
  setSecure,
  isTouched,
  maxLength,
  innerIcon,
  customStyle,
}) => {
  const [iconInput, setIconInput] = useState(null);

  useEffect(() => {
    let adjustIcon = null;
    if (innerIcon === 'eyeIcon') {
      adjustIcon = <EyeIcon />;
    }
    setIconInput(adjustIcon);
  }, [innerIcon]);

  const onToggleInputVisibility = () => setSecure && setSecure();

  return (
    <View style={styles.InputElementConainer}>
      <View style={{...styles.inputContainer, ...customStyle}}>
        <TextInput
          label={holder}
          value={inputValue}
          onChangeText={onType}
          onBlur={onBlur}
          style={{...styles.input, width: innerIcon ? wp('75%') : wp('85%')}}
          keyboardType={keyboard ? 'decimal-pad' : 'default'}
          placeholder={holder}
          secureTextEntry={isSecure}
          maxLength={maxLength}
        />
        {innerIcon && (
          <TouchableOpacity onPress={onToggleInputVisibility}>
            <View style={styles.inputWithIcon}>{iconInput}</View>
          </TouchableOpacity>
        )}
      </View>
      <TextElement customStyle={styles.error}>
        {errorMsg && isTouched ? errorMsg : null}
      </TextElement>
    </View>
  );
};

const styles = EStyleSheet.create({
  InputElementConainer: {
    height: hp('8.6%'),
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  inputContainer: {
    maxWidth: wp('85%'),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: colors.light,
    borderColor: colors.greyish,
  },
  input: {
    height: hp('6.4%'),
    paddingHorizontal: '0.5rem',
  },
  inputWithIcon: {
    width: wp('10%'),
  },
  error: {
    paddingLeft: 5,
    fontSize: '0.8rem',
    maxWidth: wp('85%'),
    color: colors.warning,
  },
});

export default InputElement;
