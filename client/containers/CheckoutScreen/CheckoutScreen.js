import React from 'react';
import {View, Image, StatusBar} from 'react-native';

// Components
import CCForm from '../../components/Forms/CCForm';
import TextElement from '../../components/Reusable/TextElement/TextElement';
import AppHeader from '../../components/AppHeader/AppHeader';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import CreditCardIcon from '../../assets/icons/credit-card-illustration.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CheckoutScreen = () => {
  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <AppHeader />
      <View
        style={{
          height: hp('90%'),
          alignItems: 'center',
          justifyContent: 'space-around',
          backgroundColor: 'red',
        }}>
        <View style={styles.titleContainer}>
          <TextElement>Checkout</TextElement>
        </View>
        <View>
          <CCForm />
        </View>
        <View>
          <CreditCardIcon />
        </View>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  screen: {},
  titleContainer: {},
});

export default CheckoutScreen;
