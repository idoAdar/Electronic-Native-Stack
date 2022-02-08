import React, {useEffect} from 'react';
import {View, Image, ActivityIndicator, StatusBar} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchOrders} from '../../redux/actions/userActions';

// Components
import OrderList from '../../components/Orders/OrderList/OrderList';
import TextElement from '../../components/Reusable/TextElement/TextElement';
import AppHeader from '../../components/AppHeader/AppHeader';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const OrdersScreen = () => {
  const {orders} = useSelector(state => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <AppHeader />

      {orders ? (
        <View>
          <View style={styles.titleContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../assets/images/orders.jpg')}
                resizeMode={'contain'}
                style={styles.image}
              />
            </View>
            <TextElement customStyle={styles.title}>Orders</TextElement>
          </View>
          <OrderList orderList={orders} />
        </View>
      ) : (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={styles.centerSpinner}
        />
      )}
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
  centerSpinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default OrdersScreen;
