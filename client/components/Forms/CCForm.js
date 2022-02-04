import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
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
import DefaultCreditCard from '../../assets/icons/defaultCreditCard.svg';
import AmexIcon from '../../assets/icons/amexIcon.svg';
import DinersIcon from '../../assets/icons/dinersIcon.svg';
import ElectronIcon from '../../assets/icons/electronIcon.svg';
import MaestroIcon from '../../assets/icons/maestroIcon.svg';
import VisaIcon from '../../assets/icons/visaIcon.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const creditCardsSvgs = [
  <AmexIcon />,
  <DinersIcon />,
  <ElectronIcon />,
  <MaestroIcon />,
  <VisaIcon />,
];

const CCForm = ({shippingTax, totalPrice, paymentMethod, openModal}) => {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const initState = {
    fullName: '',
    creditCard: '',
    cvv: '',
    paymentMethod: '',
    shippingAddress: '',
    shippingPrice: shippingTax,
    totalPrice,
  };

  const schemaValidation = Yup.object().shape({
    fullName: Yup.string().required('Fullname is required'),
    shippingAddress: Yup.string().required('Distination is required'),
    creditCard: Yup.string().required('CC number is required'),
    cvv: Yup.string().required('CVV'),
  });

  const onCheckboxCheck = () => setIsCheckboxChecked(!isCheckboxChecked);

  const onSend = (values, actions) => {
    const collectData = {
      ...values,
      paymentMethod: paymentMethod.method,
    };
    console.log(collectData);
    actions.resetForm();
  };

  let currectCreditCard = <DefaultCreditCard />;
  if (paymentMethod) {
    currectCreditCard = creditCardsSvgs[paymentMethod.icon];
  }

  return (
    <Formik
      initialValues={initState}
      validationSchema={schemaValidation}
      onSubmit={onSend}>
      {({values, handleChange, handleBlur, touched, errors, handleSubmit}) => (
        <View style={styles.centered}>
          <View style={styles.summaryContainer}>
            <TextElement customStyle={styles.summaryText}>
              Shipping Price:{' '}
              <TextElement customStyle={styles.caynFont}>
                {shippingTax}$
              </TextElement>
            </TextElement>
            <TextElement customStyle={styles.summaryText}>
              Total Price:{' '}
              <TextElement customStyle={styles.caynFont}>
                {totalPrice}$
              </TextElement>
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
              keyboard
              customStyle={styles.input}
            />
            <InputElement
              inputValue={values.cvv}
              onType={handleChange('cvv')}
              onBlur={handleBlur('cvv')}
              isTouched={touched.cvv}
              errorMsg={errors.cvv}
              holder={'CVV'}
              keyboard
              customStyle={styles.inputHalf}
            />
            <View style={styles.paymentMethodContainer}>
              <TouchableOpacity
                onPress={openModal}
                activeOpacity={0.6}
                style={styles.paymentMethod}>
                {currectCreditCard}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              color={colors.primary}
              uncheckedColor={colors.greyish}
              status={isCheckboxChecked ? 'checked' : 'unchecked'}
              onPress={onCheckboxCheck}
            />
            <TextElement>I agree to the Terms and Conditions</TextElement>
          </View>
          <View style={styles.imageContainer}>
            <CreditCardIcon />
          </View>
          <ButtonElement
            title={'ORDER NOW!'}
            onPress={handleSubmit}
            bgColor={isCheckboxChecked ? colors.primary : colors.greyish}
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
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
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
  paymentMethod: {
    height: hp('6.7%'),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light,
    borderColor: colors.greyish,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  summaryContainer: {
    flexDirection: 'row',
    width: wp('85%'),
    justifyContent: 'space-between',
  },
  imageContainer: {
    marginVertical: '1rem',
  },
  checkboxContainer: {
    width: wp('85%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryText: {
    fontSize: '0.8rem',
  },
  caynFont: {
    fontSize: '0.8rem',
    color: colors.cyan,
  },
});

export default CCForm;
