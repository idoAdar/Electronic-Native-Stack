import React from 'react';
import {FlatList} from 'react-native';

// Components
import CheckoutListItem from '../CheckoutListItem/CheckoutListItem';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

const CheckoutList = ({checkoutProductsList}) => {
  return (
    <FlatList
      data={checkoutProductsList}
      keyExtractor={itemData => itemData._id}
      showsVerticalScrollIndicator={false}
      renderItem={itemData => (
        <CheckoutListItem
          name={itemData.item.name}
          price={itemData.item.price}
          quantity={itemData.item.quantity}
        />
      )}
      style={styles.screen}
    />
  );
};

const styles = EStyleSheet.create({
  screen: {
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: '0.5rem',
    borderColor: colors.greyish,
  },
});

export default CheckoutList;
