import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';
import ButtonElement from '../../Reusable/ButtonElement/ButtonElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Summary = ({sum, productsCart}) => {
  const [calcTax, setCalcTax] = useState(0);
  const {userCart} = useSelector(state => state.userSlice);
  const navigation = useNavigation();

  useEffect(() => {
    setCalcTax(sum * 0.07);
  }, [userCart]);

  const checkoutNavigation = () => navigation.navigate('checkout');

  return (
    <View style={styles.summaryContainer}>
      <TextElement customStyle={styles.summaryText}>Summary</TextElement>
      <View>
        <TextElement customStyle={styles.taxText}>
          Tax: {calcTax.toFixed(2)}$
        </TextElement>
        <TextElement>Total: {(sum + calcTax).toFixed(2)}</TextElement>
      </View>
      <ButtonElement
        title={'Checkout'}
        bgColor={productsCart.length > 0 ? colors.cyan : colors.light}
        titleColor={productsCart.length > 0 ? colors.white : colors.greyish}
        fontWeight
        customStyle={styles.checkoutButton}
        onPress={productsCart.length > 0 ? checkoutNavigation : null}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  summaryContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '1rem',
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('10%'),
    backgroundColor: colors.greyish,
  },
  summaryText: {
    fontSize: '1.4rem',
    fontWeight: 'bold',
    color: colors.black,
  },
  taxText: {
    fontSize: '0.8rem',
  },
  checkoutButton: {
    width: wp('24%'),
  },
});

export default Summary;
