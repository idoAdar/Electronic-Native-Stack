import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Components
import {Checkbox} from 'react-native-paper';
import InputElement from '../../components/Reusable/InputElement/InputElement';
import TextElement from '../../components/Reusable/TextElement/TextElement';
import ButtonElement from '../../components/Reusable/ButtonElement/ButtonElement';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import CreditCardIcon from '../../assets/icons/credit-card-illustration.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CCForm = ({shippingTax, totalPrice, openModal}) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const initState = {
    fullName: '',
    creditCard: '',
    cvv: '',
    paymentMethod: '',
    shippingAddress: '',
    shippingPrice: '',
    totalPrice: '',
  };

  const schemaValidation = Yup.object().shape({
    fullName: Yup.string().required('set fullname'),
    creditCard: Yup.string().required('set cc number'),
    cvv: Yup.string().required('set cvv'),
    shippingAddress: Yup.string().required('set distination'),
  });

  const onCheckboxCheck = () => setIsCheckboxChecked(!isCheckboxChecked);

  const onSend = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initState}
      validationSchema={schemaValidation}
      onSubmit={onSend}>
      {({values, handleChange, handleBlur, touched, errors, handleSubmit}) => (
        <View style={styles.centered}>
          <View style={styles.summaryContainer}>
            <TextElement customStyle={styles.summaryText}>
              Shipping Price: {shippingTax.toFixed(2)}$
            </TextElement>
            <TextElement customStyle={styles.summaryText}>
              Total Price: {totalPrice.toFixed(2)}$
            </TextElement>
          </View>
          <InputElement
            inputValue={values.fullName}
            onType={handleChange('fullName')}
            onBlur={handleBlur('fullName')}
            isTouched={touched.fullName}
            errorMsg={errors.fullName}
            holder={'Full Name'}
          />
          <InputElement
            inputValue={values.shippingAddress}
            onType={handleChange('shippingAddress')}
            onBlur={handleBlur('shippingAddress')}
            isTouched={touched.shippingAddress}
            errorMsg={errors.shippingAddress}
            holder={'Shipping Address'}
          />
          <View style={{flexDirection: 'row'}}>
            <InputElement
              inputValue={values.creditCard}
              onType={handleChange('creditCard')}
              onBlur={handleBlur('creditCard')}
              isTouched={touched.creditCard}
              errorMsg={errors.creditCard}
              holder={'Credit Card'}
              customStyle={styles.input}
            />
            <InputElement
              inputValue={values.cvv}
              onType={handleChange('cvv')}
              onBlur={handleBlur('cvv')}
              isTouched={touched.cvv}
              errorMsg={errors.cvv}
              holder={'CVV'}
              customStyle={styles.inputHalf}
            />
            <View style={styles.paymentMethodContainer}>
              <TouchableOpacity
                onPress={openModal}
                activeOpacity={0.6}
                style={{
                  height: hp('6.6%'),
                  borderWidth: 1,
                  backgroundColor: colors.light,
                  borderColor: colors.greyish,
                }}></TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: wp('85%'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Checkbox
              color={colors.primary}
              uncheckedColor={colors.greyish}
              status={isCheckboxChecked ? 'checked' : 'unchecked'}
              onPress={onCheckboxCheck}
            />
            <TextElement>I agree to the Terms and Conditions</TextElement>
          </View>
          <View>
            <CreditCardIcon />
          </View>
          <ButtonElement
            title={'ORDER NOW!'}
            onPress={handleSubmit}
            bgColor={colors.primary}
            titleColor={colors.white}
            fontWeight
          />
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
    width: wp('42.5%'),
    borderRadius: 0,
  },
  inputHalf: {
    width: wp('21.25%'),
    borderRadius: 0,
  },
  paymentMethodContainer: {
    width: wp('21.25%'),
    height: hp('8.6%'),
    borderRadius: 0,
    marginVertical: 1,
  },
  summaryContainer: {
    flexDirection: 'row',
    width: wp('85%'),
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: '0.8rem',
  },
});

export default CCForm;
