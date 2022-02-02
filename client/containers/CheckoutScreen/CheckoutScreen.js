import React, {useState, useEffect, useRef} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';

// Components
import CCForm from '../../components/Forms/CCForm';
import TextElement from '../../components/Reusable/TextElement/TextElement';
import AppHeader from '../../components/AppHeader/AppHeader';
import {Modalize} from 'react-native-modalize';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CheckoutScreen = () => {
  const [calcShippingTax, setCalcShippingTax] = useState(0);
  const {userCart, isLoading} = useSelector(state => state.userSlice);
  const modalizeRef = useRef(null);

  useEffect(() => {
    setCalcShippingTax(userCart.sum * 0.07);
  }, [userCart]);

  const openModal = () => {
    modalizeRef.current?.open();
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <AppHeader />
      <View style={styles.checkoutContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/checkout.png')}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <TextElement>Checkout</TextElement>
        </View>
        <View>
          <CCForm
            shippingTax={calcShippingTax}
            totalPrice={userCart.sum + calcShippingTax}
            openModal={openModal}
          />
        </View>
      </View>
      <Modalize
        ref={modalizeRef}
        snapPoint={hp('25%')}
        panGestureEnabled={false}></Modalize>
    </View>
  );
};

const styles = EStyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  checkoutContainer: {
    height: hp('90%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '1rem',
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageContainer: {
    width: '2rem',
    height: '2rem',
    marginHorizontal: '0.5rem',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CheckoutScreen;
