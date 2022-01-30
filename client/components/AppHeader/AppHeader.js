import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

// Components
import TextElement from '../Reusable/TextElement/TextElement';

// Style
import MenuIcon from '../../assets/icons/menuIcon.svg';
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const AppHeader = () => {
  const {isAuth} = useSelector(state => state.accountSlice);

  const navigation = useNavigation();

  const openDrawer = () => navigation.openDrawer();

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <Image
          source={require('../../assets/images/logo-app.png')}
          resizeMode={'cover'}
          style={styles.headerLogo}
        />
        <View>
          <TextElement customStyle={styles.headerTitle}>I.A.E</TextElement>
          <TextElement customStyle={styles.headerText}>
            Buy Anything Just Smart
          </TextElement>
        </View>
      </View>
      {isAuth && (
        <TouchableOpacity
          onPress={openDrawer}
          activeOpacity={0.6}
          style={styles.headerRight}>
          <MenuIcon />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  headerContainer: {
    width: '100%',
    height: hp('10%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '1rem',
    backgroundColor: colors.primary,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: '2.6rem',
    height: '2.6rem',
  },
  headerTitle: {
    fontSize: '1.2rem',
    marginHorizontal: '1rem',
    color: colors.white,
  },
  headerText: {
    fontSize: '0.8rem',
    marginHorizontal: '1rem',
    fontWeight: 'bold',
    color: colors.cyan,
  },
});

export default AppHeader;
