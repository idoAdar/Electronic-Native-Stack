import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setSpinner} from '../../../redux/reducers/userSlice';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ProductItem = ({name, image, brand, price, id}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onProduct = async () => {
    await dispatch(setSpinner());
    navigation.navigate('product', {product: {id}});
  };

  return (
    <TouchableOpacity
      onPress={onProduct}
      activeOpacity={0.6}
      style={styles.productContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: image}}
          resizeMode={'contain'}
          style={styles.image}
        />
      </View>
      <View style={styles.productInfo}>
        <View>
          <TextElement customStyle={styles.productText}>{name}</TextElement>
        </View>
        <TextElement customStyle={styles.productTextSmall}>
          Brand: {brand}
        </TextElement>
        <TextElement customStyle={styles.productTextSmall}>
          Price: {price}$
        </TextElement>
      </View>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  productContainer: {
    elevation: 1,
    padding: '0.4rem',
    width: wp('46%'),
    height: hp('36%'),
    justifyContent: 'space-between',
    margin: '0.2rem',
    backgroundColor: colors.white,
  },
  imageContainer: {
    width: '100%',
    height: hp('25%'),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  productInfo: {
    borderTopWidth: 1,
    paddingTop: '0.4rem',
    borderColor: colors.greyish,
  },
  productText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: '0.8rem',
    color: colors.black,
  },
  productTextSmall: {
    textAlign: 'center',
    fontSize: '0.7rem',
  },
});

export default ProductItem;
