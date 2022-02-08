import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {resetUserCart} from '../../redux/reducers/userSlice';

// Components
import CCForm from '../../components/Forms/CCForm';
import CheckoutList from '../../components/Checkout/CheckoutList/CheckoutList';
import CCModal from '../../components/Modals/CCModal/CCModal';
import CheckoutModal from '../../components/Modals/CheckoutModal/CheckoutModal';
import TextElement from '../../components/Reusable/TextElement/TextElement';
import AppHeader from '../../components/AppHeader/AppHeader';
import {Modalize} from 'react-native-modalize';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CheckoutScreen = ({navigation, route}) => {
  const {userCart, message} = useSelector(state => state.userSlice);
  const [calcShippingTax, setCalcShippingTax] = useState(userCart.sum * 0.07);
  const [paymentMethod, setPaymentMethod] = useState({method: 'amex', icon: 0});
  const [modalType, setModalType] = useState(null);
  const checkoutProductsList = route.params.productsCart;
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  const openModal = async type => {
    Keyboard.dismiss();
    await setModalType(type);
    modalizeRef.current?.open();
  };

  const getPaymentMethod = (method, icon) => {
    setPaymentMethod({method, icon});
    modalizeRef.current?.close();
  };

  const cartNavigate = () => navigation.goBack();

  const ordersNavigate = () => {
    navigation.navigate('drawer-main', {screen: 'orders-tab'});
    dispatch(resetUserCart());
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <AppHeader />
      <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset={-140}>
        <View style={styles.checkoutContainer}>
          <View style={styles.titleContainer}>
            <TouchableOpacity
              onPress={cartNavigate}
              activeOpacity={0.6}
              style={styles.backContainer}>
              <Image
                source={require('../../assets/images/back.png')}
                resizeMode={'contain'}
                style={styles.image}
              />
            </TouchableOpacity>
            <TextElement customStyle={styles.title}>Checkout</TextElement>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/checkout.png')}
                resizeMode={'contain'}
                style={styles.image}
              />
            </View>
          </View>

          <View style={styles.checkoutItemsContainer}>
            <CheckoutList checkoutProductsList={checkoutProductsList} />
          </View>
          <CCForm
            shippingTax={calcShippingTax.toFixed(2)}
            totalPrice={(userCart?.sum + calcShippingTax).toFixed(2)}
            checkoutProductsList={checkoutProductsList}
            paymentMethod={paymentMethod}
            openModal={openModal}
          />
        </View>
      </KeyboardAvoidingView>
      <Modalize
        ref={modalizeRef}
        snapPoint={modalType === 'creditCards' ? hp('52%') : hp('25%')}
        panGestureEnabled={false}
        closeOnOverlayTap={modalType === 'creditCards' ? true : false}>
        {modalType === 'creditCards' ? (
          <CCModal getPaymentMethod={getPaymentMethod} />
        ) : (
          <CheckoutModal ordersNavigate={ordersNavigate} message={message} />
        )}
      </Modalize>
    </View>
  );
};

const styles = EStyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  titleContainer: {
    alignItems: 'center',
    width: wp('85%'),
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    color: colors.black,
    fontSize: '1.4rem',
    textAlign: 'center',
    marginVertical: '1rem',
  },
  checkoutContainer: {
    height: hp('90%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '1rem',
  },
  checkoutItemsContainer: {
    height: '24%',
  },
  imageContainer: {
    width: '2.4rem',
    height: '2.4rem',
  },
  backContainer: {
    width: '2.8rem',
    height: '2.8rem',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CheckoutScreen;
