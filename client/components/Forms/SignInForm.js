import React, {useState} from 'react';
import {View} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux';
import {setAccountSpinner} from '../../redux/reducers/accountSlice';
import {signIn} from '../../redux/actions/accountAction';

// Components
import InputElement from '../Reusable/InputElement/InputElement';
import ButtonElement from '../Reusable/ButtonElement/ButtonElement';

// Styles
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

const SignInForm = () => {
  const [visiblePassword, setVisiblePassword] = useState(true);
  const {isLoading} = useSelector(state => state.accountSlice);
  const dispatch = useDispatch();

  const initState = {
    email: 'Ido@Gmail.com',
    password: '239738416',
  };

  const schemaValidation = Yup.object().shape({
    email: Yup.string()
      .email()
      .required('Please make sure to enter a valid email'),
    password: Yup.string().required('Please enter your password'),
  });

  const secureIconHandler = () => setVisiblePassword(!visiblePassword);

  const onSend = (values, actions) => {
    actions.resetForm();
    dispatch(setAccountSpinner());
    dispatch(signIn(values));
  };

  return (
    <Formik
      initialValues={initState}
      validationSchema={schemaValidation}
      onSubmit={onSend}>
      {({values, handleChange, handleBlur, touched, errors, handleSubmit}) => (
        <View style={styles.centered}>
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
            isSecure={visiblePassword}
            setSecure={secureIconHandler}
            holder={'Password'}
            innerIcon={'eyeIcon'}
          />
          <View style={styles.btnContainer}>
            <ButtonElement
              title={'Login'}
              onPress={handleSubmit}
              bgColor={colors.primary}
              titleColor={colors.white}
              fontWeight
              setSpinner={isLoading}
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
  btnContainer: {
    marginVertical: '5%',
  },
});

export default SignInForm;
