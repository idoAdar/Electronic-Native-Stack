import React, {useState} from 'react';
import {View, Platform} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {setAccountSpinner} from '../../redux/reducers/accountSlice';
import {signUp} from '../../redux/actions/accountAction';

// Components
import {Checkbox} from 'react-native-paper';
import TextElement from '../Reusable/TextElement/TextElement';
import InputElement from '../Reusable/InputElement/InputElement';
import ButtonElement from '../Reusable/ButtonElement/ButtonElement';

// Styles
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../assets/colors/colors';

const SignUpForm = () => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const {isLoading} = useSelector(state => state.accountSlice);
  const dispatch = useDispatch();

  const initState = {
    username: '',
    email: '',
    password: '',
  };

  const schemaValidation = Yup.object().shape({
    username: Yup.string().required('Full Name is required'),
    email: Yup.string().email().required('A valide email is required'),
    password: Yup.string()
      .required('is required')
      .min(9, 'Password must be at least 9 digits'),
  });

  const onCheckboxCheck = () => setIsCheckboxChecked(!isCheckboxChecked);

  const secureIconHandler = () => setVisiblePassword(!visiblePassword);

  const onCreateAccount = (values, actions) => {
    actions.resetForm();
    dispatch(setAccountSpinner());
    dispatch(signUp(values));
  };

  return (
    <Formik
      initialValues={initState}
      validationSchema={schemaValidation}
      onSubmit={onCreateAccount}>
      {({values, handleChange, handleBlur, touched, errors, handleSubmit}) => (
        <View style={styles.centered}>
          <InputElement
            inputValue={values.username}
            onType={handleChange('username')}
            onBlur={handleBlur('username')}
            isTouched={touched.username}
            errorMsg={errors.username}
            holder={'Username'}
          />
          <InputElement
            inputValue={values.email}
            onType={handleChange('email')}
            onBlur={handleBlur('email')}
            isTouched={touched.email}
            errorMsg={errors.email}
            holder={'Email'}
          />
          <InputElement
            inputValue={values.password}
            onType={handleChange('password')}
            onBlur={handleBlur('password')}
            isTouched={touched.password}
            errorMsg={errors.password}
            holder={'Password'}
            isSecure={visiblePassword}
            setSecure={secureIconHandler}
            innerIcon={'eyeIcon'}
          />
          <View style={styles.btnContainer}>
            <ButtonElement
              title={'Register'}
              onPress={isCheckboxChecked ? handleSubmit : null}
              bgColor={isCheckboxChecked ? colors.primary : colors.greyish}
              titleColor={colors.white}
              disabled={isCheckboxChecked}
              fontWeight
              setSpinner={isLoading}
            />
          </View>
          <View style={styles.checkboxContainer}>
            <View
              style={
                Platform.OS === 'ios' ? styles.checkboxContainerIOS : null
              }>
              <Checkbox
                color={colors.primary}
                uncheckedColor={colors.greyish}
                status={isCheckboxChecked ? 'checked' : 'unchecked'}
                onPress={onCheckboxCheck}
              />
            </View>
            <TextElement customStyle={styles.disclaimer}>
              {'I agree to the Terms & Conditions'}
            </TextElement>
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
  checkboxContainer: {
    marginTop: '0.4rem',
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainerIOS: {
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.greyish,
  },
  btnContainer: {
    marginTop: '5%',
  },
  disclaimer: {
    fontSize: '0.85rem',
    color: colors.black,
  },
});

export default SignUpForm;
