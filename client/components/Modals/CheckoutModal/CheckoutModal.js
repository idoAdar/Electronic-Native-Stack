import React from 'react';
import {View} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';
import ButtonElement from '../../Reusable/ButtonElement/ButtonElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CheckoutModal = ({ordersNavigate, message}) => {
  return (
    <View style={styles.modalContainer}>
      <TextElement
        customStyle={{
          textAlign: 'center',
          color: colors.primary,
          fontSize: 22,
        }}>
        Congratulations!
      </TextElement>
      <TextElement customStyle={{textAlign: 'center'}}>{message}</TextElement>
      <ButtonElement
        title={'Continue to Orders'}
        bgColor={colors.primary}
        titleColor={colors.white}
        onPress={ordersNavigate}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  modalContainer: {
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: colors.white,
  },
});

export default CheckoutModal;
