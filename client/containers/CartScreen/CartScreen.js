import React, {useState, useEffect, useRef} from 'react';
import {View, StatusBar} from 'react-native';
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
      <View style={styles.titleContainer}>
        {productsCart.length > 0 && (
          <TextElement customStyle={styles.title}>Cart</TextElement>
        )}
      </View>
      <CartList
        cartList={productsCart}
        openModal={openModal}
        homeNavigate={homeNavigate}
      />
      <Summary sum={userCart.sum} productsCart={productsCart} />
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
    height: hp('8%'),
  },
  title: {
    color: colors.black,
    fontSize: '1.4rem',
    textAlign: 'center',
    marginVertical: '1rem',
  },
});

export default CartScreen;
