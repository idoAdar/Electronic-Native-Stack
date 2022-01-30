import React, {useEffect} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {setClearMessage} from '../../redux/reducers/accountSlice';

// Components
import AppHeader from '../../components/AppHeader/AppHeader';
import SignUpForm from '../../components/Forms/SignUpForm';
import TextElement from '../../components/Reusable/TextElement/TextElement';

// Styles
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SignUpScreen = ({navigation}) => {
  const {message} = useSelector(state => state.accountSlice);
  const dispatch = useDispatch();

  const handleNavigation = () => navigation.navigate('sign-in');

  useEffect(() => {
    dispatch(setClearMessage());
  }, []);

  return (
    <ScrollView scrollEnabled={false}>
      <StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
      <AppHeader />
      <View style={styles.screen}>
        <TextElement customStyle={styles.message}>{message}</TextElement>
        <View style={styles.textContainer}>
          <View style={styles.titleContainer}>
            <View style={styles.iconImageContainer}>
              <Image
                source={require('../../assets/images/enter-boarding.jpg')}
                resizeMode={'cover'}
                style={styles.image}
              />
            </View>
            <TextElement customStyle={styles.textBold}>Sign Up</TextElement>
          </View>
          <TextElement>Create your account and start your journey</TextElement>
        </View>
        <SignUpForm />
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/signup-boarding.jpg')}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
        <View style={styles.footer}>
          <TextElement customStyle={styles.textRegular}>
            Already have account?
          </TextElement>
          <TouchableOpacity onPress={handleNavigation}>
            <TextElement customStyle={styles.linkText}>Sign-In</TextElement>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = EStyleSheet.create({
  screen: {
    height: hp('90%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  message: {
    textAlign: 'center',
    fontSize: '0.8rem',
    height: hp('5%'),
    width: wp('85%'),
  },
  textContainer: {
    width: wp('85%'),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconImageContainer: {
    width: '2rem',
    height: '2rem',
  },
  imageContainer: {
    width: '12rem',
    height: '12rem',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: '1.4rem',
    textAlign: 'center',
    color: colors.black,
  },
  linkText: {
    color: colors.secondary,
  },
  footer: {
    alignItems: 'center',
  },
  error: {
    fontSize: '0.8rem',
    color: colors.warning,
  },
});

export default SignUpScreen;
