import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

// Components
import TextElement from '../Reusable/TextElement/TextElement';
import ProductsTab from '../../assets/icons/productsTab.svg';
import OrderTab from '../../assets/icons/ordersTab.svg';

// Style
import EStyleSheet from 'react-native-extended-stylesheet';
import {colors} from '../../assets/colors/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Fixtures
import {tabs} from '../../fixtures/NavigationTabs.json';

const homeTab = 'home-tab';
const ordersTab = 'orders-tab';

const AppTabBar = ({navigation}) => {
  const [tabsState, _setTabsState] = useState(tabs);
  const [currentTab, setCurrentTab] = useState(homeTab);

  const routeNavigation = (section, route) => {
    setCurrentTab(route);
    navigation.navigate(section, {screen: route});
  };

  const navigationTabs = [
    <ProductsTab
      style={{
        color: currentTab === homeTab ? colors.cyan : colors.black,
      }}
    />,
    <OrderTab
      style={{
        color: currentTab === ordersTab ? colors.cyan : colors.black,
      }}
    />,
  ];

  return (
    <View style={styles.tabBarContainer}>
      {tabsState.map(({tab, route, icon, section}) => (
        <TouchableOpacity
          key={tab}
          style={styles.tabContainer}
          activeOpacity={0.6}
          onPress={routeNavigation.bind(this, section, route)}>
          <View style={styles.iconTabContainer}>{navigationTabs[icon]}</View>
          <TextElement
            customStyle={{
              ...styles.tabText,
              color: currentTab === route ? colors.cyan : colors.black,
            }}>
            {tab}
          </TextElement>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = EStyleSheet.create({
  tabBarContainer: {
    height: hp('8%'),
    width: wp('100%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 5,
    borderTopWidth: 0.5,
    backgroundColor: colors.white,
    borderColor: colors.light,
    shadowColor: colors.black,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.greyish,
    backgroundColor: colors.white,
    width: wp('20%'),
  },
  iconTabContainer: {
    height: '1.4rem',
    marginVertical: 2,
  },
  tabText: {
    fontSize: '0.8rem',
    color: colors.black,
  },
});

export default AppTabBar;
