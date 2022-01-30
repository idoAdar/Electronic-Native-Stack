import React, {Fragment} from 'react';
import {View, FlatList, Image} from 'react-native';

// Components
import ButtonElement from '../../Reusable/ButtonElement/ButtonElement';
import TextElement from '../../Reusable/TextElement/TextElement';
import CartItem from '../CartItem/CartItem';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

const CartList = ({cartList, openModal, homeNavigate}) => {
  return (
    <Fragment>
      {cartList.length > 0 ? (
        <FlatList
          data={cartList}
          keyExtractor={itemData => itemData._id}
          style={styles.listContainer}
          renderItem={itemData => (
            <CartItem
              productId={itemData.item._id}
              image={itemData.item.image}
              brand={itemData.item.brand}
              quantity={itemData.item.quantity}
              price={itemData.item.price}
              openModal={openModal}
            />
          )}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/images/stock-out-pngrepo-com.png')}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <TextElement customStyle={styles.emptyCartText}>
            Please add some products to your cart for make any order
          </TextElement>
          <ButtonElement
            title={'Continue'}
            bgColor={colors.primary}
            titleColor={colors.white}
            customStyle={styles.continueButton}
            onPress={homeNavigate}
          />
        </View>
      )}
    </Fragment>
  );
};

const styles = EStyleSheet.create({
  listContainer: {
    backgroundColor: colors.white,
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '8rem',
  },
  emptyCartText: {
    textAlign: 'center',
  },
  imageContainer: {
    width: '4rem',
    height: '4rem',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  continueButton: {
    width: '6rem',
    height: '3rem',
  },
});

export default CartList;
