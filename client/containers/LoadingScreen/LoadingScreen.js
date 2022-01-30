import React, {useEffect} from 'react';
import {View, Image, ActivityIndicator, StatusBar} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUserAuthenticated} from '../../redux/reducers/accountSlice';

// Components
import TextElement from '../../components/Reusable/TextElement/TextElement';

// Styles
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Utils
import {fetchFromStorage} from '../../utils/setAsyncStorage';

const LoadingScreen = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initApplication = setTimeout(() => {
      const userCheck = async () => {
        const isLoggedIn = await fetchFromStorage();
        if (isLoggedIn) {
          return dispatch(setUserAuthenticated());
        }
        navigation.navigate('sign-in');
      };
      userCheck();
    }, 2000);

    return () => clearTimeout(initApplication);
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.white} />
      <View style={styles.loadingContainer}>
        <View style={{alignItems: 'center'}}>
          <TextElement customStyle={styles.mainTitle}>
            I.A Electronic Shop
          </TextElement>
          <TextElement>THINK BIG - BUY SMART</TextElement>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/loading-logo.png')}
            resizeMode={'cover'}
            fadeDuration={1000}
            style={styles.logo}
          />
        </View>
        <ActivityIndicator size={'large'} color={colors.primary} />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  loadingContainer: {
    height: hp('55%'),
    justifyContent: 'space-between',
    marginBottom: '5rem',
  },
  mainTitle: {
    fontSize: '2rem',
  },
  logoContainer: {
    width: wp('70%'),
    height: hp('30%'),
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default LoadingScreen;
