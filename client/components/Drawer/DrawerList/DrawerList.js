import React from 'react';
import {FlatList} from 'react-native';

// Components
import DrawerItem from '../DrawerItem/DrawerItem';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

// Fixture
import {menu} from '../../../fixtures/UserMenu.json';

const DrawerList = ({logout}) => {
  return (
    <FlatList
      data={menu}
      keyExtractor={itemData => itemData.id}
      style={styles.drawerListContainer}
      renderItem={itemData => (
        <DrawerItem
          key={itemData.item.id}
          section={itemData.item.section}
          title={itemData.item.title}
          route={itemData.item.route}
          icon={itemData.item.icon}
          onLogout={logout}
        />
      )}
    />
  );
};

const styles = EStyleSheet.create({
  drawerListContainer: {
    backgroundColor: colors.white,
  },
});

export default DrawerList;
