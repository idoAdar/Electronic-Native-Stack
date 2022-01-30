import React, {Fragment, useEffect} from 'react';
import {View, Image, ActivityIndicator, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchProducts, fetchUserCart} from '../../redux/actions/userActions';

// Components
import AppHeader from '../../components/AppHeader/AppHeader';
import ProductsList from '../../components/Products/ProductsList/ProductsList';
import TextElement from '../../components/Reusable/TextElement/TextElement';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

const HomeScreen = () => {
  const {products, isLoading} = useSelector(state => state.userSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserCart());
    dispatch(fetchProducts());
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <AppHeader />
      {!isLoading ? (
        <Fragment>
          <View style={styles.welcomeBoxContainer}>
            <View style={styles.welcomeBoxTitle}>
              <TextElement customStyle={styles.IAText}>
                I.A Electronics
              </TextElement>
              <Image
                source={require('../../assets/images/cartLogo.png')}
                resizeMode={'cover'}
                style={styles.cartImage}
              />
            </View>
            <TextElement customStyle={styles.welcomeBox}>
              Is the best place for our customers to shop, serach and find what
              they're looking for, all at the best price possible!
            </TextElement>
          </View>
          <ProductsList products={products} />
        </Fragment>
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
  },
  welcomeBoxContainer: {
    marginHorizontal: '1rem',
    marginVertical: '0.5rem',
    alignItems: 'center',
  },
  welcomeBoxTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeBox: {
    fontSize: '0.8rem',
    padding: '0.5rem',
    borderRadius: 5,
    color: colors.white,
    backgroundColor: colors.cyan,
  },
  IAText: {
    fontSize: '1.4rem',
    marginHorizontal: '1rem',
    color: colors.black,
  },
  cartImage: {
    width: '3rem',
    height: '3rem',
  },
  centerSpinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default HomeScreen;
