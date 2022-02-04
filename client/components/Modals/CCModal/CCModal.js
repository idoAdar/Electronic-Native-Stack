import React from 'react';
import {View, TouchableOpacity} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';

// Style
import AmexIcon from '../../../assets/icons/amexIcon.svg';
import DinersIcon from '../../../assets/icons/dinersIcon.svg';
import ElectronIcon from '../../../assets/icons/electronIcon.svg';
import MaestroIcon from '../../../assets/icons/maestroIcon.svg';
import VisaIcon from '../../../assets/icons/visaIcon.svg';
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Fixtures
import {creditCards} from '../../../fixtures/CreditCards.json';

const creditCardsSvgs = [
  <AmexIcon />,
  <DinersIcon />,
  <ElectronIcon />,
  <MaestroIcon />,
  <VisaIcon />,
];

const CCModal = ({getPaymentMethod}) => {
  return (
    <View style={styles.modalContainer}>
      {creditCards.map(({id, title, value, icon}) => (
        <TouchableOpacity
          key={id}
          onPress={getPaymentMethod.bind(this, value, icon)}
          activeOpacity={0.6}
          style={styles.modalItem}>
          <TextElement>{title}</TextElement>
          {creditCardsSvgs[icon]}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  modalItem: {
    height: hp('10%'),
    paddingHorizontal: '2rem',
    marginHorizontal: '1rem',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.greyish,
  },
});

export default CCModal;
