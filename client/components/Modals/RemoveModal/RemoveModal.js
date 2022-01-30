import React from 'react';
import {View} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';
import ButtonElement from '../../Reusable/ButtonElement/ButtonElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const RemoveModal = ({onApprove, closeModal, isLoading}) => {
  return (
    <View style={styles.modalContainer}>
      <TextElement customStyle={styles.modalText}>
        Are you sure you want to remove name product from your cart?
      </TextElement>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title={'Cancel'}
          bgColor={colors.greyish}
          customStyle={styles.button}
          onPress={closeModal}
        />
        <ButtonElement
          title={'Approve'}
          bgColor={colors.primary}
          titleColor={colors.white}
          customStyle={styles.button}
          onPress={onApprove}
          setSpinner={isLoading}
        />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  modalContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: hp('25%'),
    padding: '1rem',
    backgroundColor: colors.white,
  },
  modalText: {
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: '0.6rem',
    width: wp('30%'),
  },
});

export default RemoveModal;
