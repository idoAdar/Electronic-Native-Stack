import React from 'react';
import {View, Image} from 'react-native';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';
import ButtonElement from '../../Reusable/ButtonElement/ButtonElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

const CartItem = ({productId, brand, image, quantity, price, openModal}) => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: image}}
          resizeMode={'contain'}
          style={styles.image}
        />
      </View>
      <View>
        <TextElement customStyle={styles.detailsTitle}>{brand}</TextElement>
        <TextElement customStyle={styles.detailsMin}>
          Quantity: {quantity}
        </TextElement>
        <TextElement customStyle={styles.detailsMin}>
          Price: {price.toFixed(2)}$
        </TextElement>
      </View>
      <ButtonElement
        title={'Remove'}
        bgColor={colors.greyish}
        titleColor={colors.black}
        customStyle={styles.removeButton}
        onPress={openModal.bind(this, productId)}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '1rem',
    marginVertical: '0.2rem',
    justifyContent: 'space-between',
    paddingVertical: '0.5rem',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.greyish,
    backgroundColor: colors.light,
  },
  imageContainer: {
    width: '6rem',
    height: '6rem',
  },
  image: {
    borderRadius: 25,
    width: '100%',
    height: '100%',
  },
  removeButton: {
    width: '5rem',
    height: '2rem',
  },
  detailsTitle: {
    fontSize: '1.1rem',
    color: colors.black,
  },
  detailsMin: {
    fontSize: '0.8rem',
  },
});

export default CartItem;
