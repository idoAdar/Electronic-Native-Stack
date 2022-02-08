import React, {useRef} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {useSelector} from 'react-redux';

// Components
import {Modalize} from 'react-native-modalize';
import AmountModal from '../../components/Modals/AmountModal/AmountModal';
import ButtonElement from '../../components/Reusable/ButtonElement/ButtonElement';
import TextElement from '../../components/Reusable/TextElement/TextElement';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import BackArrow from '../../assets/icons/backArrow.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProductScreen = ({navigation}) => {
  const {singleProduct, isLoading} = useSelector(state => state.userSlice);
  const modalizeRef = useRef(null);

  const navigate = () => navigation.navigate('main', {screen: 'cart'});

  const openModal = () => modalizeRef.current?.open();

  const onBackIcon = () => navigation.navigate('drawer-main', {screen: 'home'});

  let displayAmountModal = null;
  if (!isLoading && singleProduct) {
    displayAmountModal = (
      <Modalize
        ref={modalizeRef}
        snapPoint={hp('25%')}
        panGestureEnabled={false}>
        <AmountModal
          id={singleProduct._id}
          name={singleProduct.name}
          amount={singleProduct.countInStock}
          price={singleProduct.price}
          navigate={navigate}
        />
      </Modalize>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      {!isLoading ? (
        <View style={styles.productContainer}>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={onBackIcon}
              activeOpacity={0.6}
              style={styles.iconSection}>
              <BackArrow />
              <TextElement>HOME</TextElement>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={navigate}
              activeOpacity={0.6}
              style={styles.iconSection}>
              <Image
                source={require('../../assets/images/cartFlush.png')}
                resizeMode={'cover'}
                style={styles.cartImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: singleProduct.image}}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <View style={styles.detailsContainer}>
            <TextElement customStyle={styles.productName}>
              {singleProduct.name}
            </TextElement>
            <TextElement>{singleProduct.brand}</TextElement>
            <TextElement customStyle={styles.smallFont}>
              {singleProduct.description}
            </TextElement>
            <TextElement customStyle={styles.smallFont}>
              Price:{' '}
              <TextElement customStyle={styles.cyanFont}>
                {singleProduct.price}$
              </TextElement>
            </TextElement>
            <TextElement customStyle={styles.smallFont}>
              Count In Stock:{' '}
              <TextElement customStyle={styles.warningFont}>
                {singleProduct.countInStock}
              </TextElement>
            </TextElement>
          </View>
          <View style={styles.bottomContainer}>
            <ButtonElement
              title={'Add to Cart'}
              bgColor={colors.primary}
              titleColor={colors.white}
              fontWeight
              onPress={openModal}
            />
          </View>
        </View>
      ) : (
        <ActivityIndicator
          size={'large'}
          color={colors.primary}
          style={styles.centerSpinner}
        />
      )}
      {displayAmountModal}
    </View>
  );
};

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  productContainer: {
    flex: 1,
    width: wp('85%'),
    paddingVertical: '1rem',
    justifyContent: 'space-around',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  iconSection: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cartImage: {
    width: '3rem',
    height: '3rem',
  },
  imageContainer: {
    width: wp('85%'),
    height: hp('50%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  productName: {
    fontSize: '1.4rem',
    color: colors.black,
  },
  smallFont: {
    fontSize: '0.8rem',
  },
  cyanFont: {
    color: colors.cyan,
    fontSize: '0.8rem',
  },
  warningFont: {
    color: colors.warning,
    fontSize: '0.8rem',
  },
  detailsContainer: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    height: hp('35%'),
  },
  bottomContainer: {
    alignItems: 'center',
  },
  centerSpinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ProductScreen;
