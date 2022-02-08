import React from 'react';
import {View} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

const OrderItem = ({id, totalPrice, paidAt}) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(paidAt);

  return (
    <View style={styles.orderContainer}>
      <TextElement customStyle={styles.text}>ORDER ID: {id}</TextElement>
      <TextElement customStyle={styles.text}>Total: {totalPrice}$</TextElement>
      <TextElement customStyle={styles.text}>
        Date: {date.toLocaleDateString('de-DE', options)}
      </TextElement>
    </View>
  );
};

const styles = EStyleSheet.create({
  orderContainer: {
    marginVertical: '0.2rem',
    padding: '1rem',
    borderWidth: 1,
    borderColor: colors.greyish,
    backgroundColor: colors.light,
  },
  text: {
    fontSize: '1rem',
    color: colors.black,
  },
});

export default OrderItem;
