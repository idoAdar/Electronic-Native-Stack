import React, {useState, useEffect, useRef} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setSpinner} from '../../redux/reducers/userSlice';
import {removeFromCart} from '../../redux/actions/userActions';

// Components
import AppHeader from '../../components/AppHeader/AppHeader';
import Summary from '../../components/Cart/Summary/Summary';
import CartList from '../../components/Cart/CartList/CartList';
import TextElement from '../../components/Reusable/TextElement/TextElement';
import {Modalize} from 'react-native-modalize';
import RemoveModal from '../../components/Modals/RemoveModal/RemoveModal';

// Style
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../assets/colors/colors';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CartScreen = ({navigation}) => {
  const [productsCart, setProductsCart] = useState([]);
  const [selectCartItem, setSelectCartItem] = useState(null);
  const {userCart, products, isLoading} = useSelector(state => state.userSlice);
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  const openModal = productId => {
    setSelectCartItem(productId);
    modalizeRef.current?.open();
  };
  const closeModal = () => modalizeRef.current?.close();

  const onApprove = async () => {
    dispatch(setSpinner());
    await dispatch(removeFromCart(selectCartItem));
    closeModal();
  };

  const homeNavigate = () => navigation.navigate('home');

  const checkoutNavigation = () =>
    navigation.navigate('checkout', {productsCart});

  useEffect(() => {
    if (userCart) {
      userCart.cart.forEach(cartItem => {
        for (let product of products) {
          if (product._id === cartItem.productId) {
            setProductsCart(prevState => [
              ...prevState,
              {...product, ...cartItem},
            ]);
          }
        }
      });
    }

    return () => setProductsCart([]);
  }, [userCart]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <AppHeader />
      {productsCart.length > 0 && (
        <View style={styles.titleContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/stock-pngrepo-com.png')}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <TextElement customStyle={styles.title}>Cart</TextElement>
        </View>
      )}
      <CartList
        cartList={productsCart}
        openModal={openModal}
        homeNavigate={homeNavigate}
      />
      <Summary
        sum={userCart.sum}
        productsCart={productsCart}
        checkoutNavigation={checkoutNavigation}
      />
      <Modalize
        ref={modalizeRef}
        snapPoint={hp('25%')}
        panGestureEnabled={false}>
        <RemoveModal
          closeModal={closeModal}
          onApprove={onApprove}
          isLoading={isLoading}
        />
      </Modalize>
    </View>
  );
};

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  titleContainer: {
    height: hp('12%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: colors.black,
    fontSize: '1.4rem',
    textAlign: 'center',
    marginVertical: '1rem',
  },
  imageContainer: {
    width: '4rem',
    height: '4rem',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CartScreen;
