import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

// Components
import TextElement from '../../Reusable/TextElement/TextElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import HomeIcon from '../../../assets/icons/homeIcon.svg';
import FavoritesIcon from '../../../assets/icons/favoritesIcon.svg';
import NewProductIcon from '../../../assets/icons/newProductIcon.svg';
import LogoutIcon from '../../../assets/icons/logoutIcon.svg';

const menuIcons = [
  <HomeIcon />,
  <FavoritesIcon />,
  <NewProductIcon />,
  <LogoutIcon />,
];

const DrawerItem = ({title, section, route, icon, onLogout}) => {
  const navigation = useNavigation();

  const onPressItem = () => {
    if (title === 'Logout') {
      return onLogout();
    }
    navigation.navigate(section, {screen: route});
  };

  return (
    <TouchableOpacity
      onPress={onPressItem}
      activeOpacity={0.6}
      style={styles.itemContainer}>
      {menuIcons[icon]}
      <TextElement customStyle={styles.menuTitle}>{title}</TextElement>
    </TouchableOpacity>
  );
};

const styles = EStyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: colors.greyish,
    paddingVertical: '1.2rem',
    marginHorizontal: '1rem',
  },
  menuTitle: {
    marginHorizontal: '0.5rem',
  },
});

export default DrawerItem;
