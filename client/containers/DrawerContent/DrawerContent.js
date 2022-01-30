import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {logout} from '../../redux/actions/accountAction';

// Components
import DrawerList from '../../components/Drawer/DrawerList/DrawerList';
import TextElement from '../../components/Reusable/TextElement/TextElement';

// Style
import {colors} from '../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

// Utils
import {fetchFromStorage} from '../../utils/setAsyncStorage';

const DrawerContent = () => {
  const [username, setUsername] = useState(null);
  const {isAuth} = useSelector(state => state.accountSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    const initDrawerContent = async () => {
      const userStorage = await fetchFromStorage();
      setUsername(userStorage?.username);
    };
    initDrawerContent();
  }, [isAuth]);

  const onLogout = () => dispatch(logout());

  return (
    <View style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/avatar.jpg')}
            resizeMode={'cover'}
            style={styles.image}
          />
        </View>
        <TextElement customStyle={styles.usernameTitle}>
          Hi {username}
        </TextElement>
        <TextElement customStyle={styles.headerText}>
          * Shop for the best selection of electronics
        </TextElement>
      </View>
      <DrawerList logout={onLogout} />
    </View>
  );
};

const styles = EStyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  drawerHeader: {
    height: hp('24%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: colors.light,
    borderColor: colors.greyish,
  },
  imageContainer: {
    width: '6rem',
    height: '6rem',
  },
  image: {
    borderRadius: 50,
    width: '100%',
    height: '100%',
  },
  usernameTitle: {
    color: colors.black,
  },
  headerText: {
    fontSize: '0.7rem',
  },
});

export default DrawerContent;
