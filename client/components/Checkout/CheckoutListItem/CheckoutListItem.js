import React from 'react';
import {View} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const CheckoutListItem = ({name, quantity}) => {
  return (
    <View style={styles.itemContainer}>
      <TextElement customStyle={styles.item}>Item: {name}</TextElement>
      <TextElement customStyle={styles.item}>Quantity: X{quantity}</TextElement>
    </View>
  );
};

const styles = EStyleSheet.create({
  itemContainer: {
    width: wp('85%'),
    justifyContent: 'space-between',
    paddingVertical: '0.2rem',
    borderBottomWidth: 1,
    borderColor: colors.light,
  },
  item: {
    fontSize: '0.6rem',
  },
});

export default CheckoutListItem;
