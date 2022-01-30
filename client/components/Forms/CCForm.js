import React from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Components
import InputElement from '../../components/Reusable/InputElement/InputElement';
import TextElement from '../../components/Reusable/TextElement/TextElement';
import ButtonElement from '../../components/Reusable/ButtonElement/ButtonElement';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CCForm = () => {
  const initState = {
    fullName: '',
    creditCard: '',
    cvv: '',
    paymentMethod: '',
    shippingAddress: '',
    shippingPrice: '',
    totalPrice: '',
  };

  const schemaValidation = Yup.object().shape({});

  const onSend = (values, actions) => {};

  return (
    <Formik
      initialValues={initState}
      validationSchema={schemaValidation}
      onSubmit={onSend}>
      {({values, handleChange, handleBlur, touched, errors, handleSubmit}) => (
        <View style={styles.centered}>
          <View style={{flexDirection: 'row'}}>
            <InputElement
              inputValue={values.fullName}
              onType={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              isTouched={touched.fullName}
              errorMsg={errors.fullName}
              holder={'Full Name'}
              innerIcon={'eyeIcon'}
              customStyle={styles.input}
            />
            <InputElement
              inputValue={values.shippingAddress}
              onType={handleChange('shippingAddress')}
              onBlur={handleBlur('shippingAddress')}
              isTouched={touched.shippingAddress}
              errorMsg={errors.shippingAddress}
              holder={'Shipping Address'}
              innerIcon={'eyeIcon'}
              customStyle={styles.input}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <InputElement
              inputValue={values.creditCard}
              onType={handleChange('creditCard')}
              onBlur={handleBlur('creditCard')}
              isTouched={touched.creditCard}
              errorMsg={errors.creditCard}
              holder={'Credit Card'}
              innerIcon={'eyeIcon'}
              customStyle={styles.input}
            />
            <InputElement
              inputValue={values.cvv}
              onType={handleChange('cvv')}
              onBlur={handleBlur('cvv')}
              isTouched={touched.cvv}
              errorMsg={errors.cvv}
              holder={'CVV'}
              innerIcon={'eyeIcon'}
              customStyle={styles.inputHalf}
            />
            <View
              style={{
                ...styles.inputHalf,
                height: 50,
                backgroundColor: 'green',
              }}></View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextElement>Shipping Price:</TextElement>
            <TextElement>Total Price: </TextElement>
          </View>
          <View style={styles.btnContainer}>
            <ButtonElement
              title={'ORDER NOW!'}
              onPress={handleSubmit}
              bgColor={colors.primary}
              titleColor={colors.white}
              fontWeight
            />
          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = EStyleSheet.create({
  centered: {
    alignItems: 'center',
  },
  input: {
    width: wp('45%'),
    borderRadius: 0,
  },
  inputHalf: {
    width: wp('22.5%'),
    borderRadius: 0,
  },
  btnContainer: {
    marginVertical: '5%',
  },
});

export default CCForm;
