import React from 'react';
import {FlatList} from 'react-native';

// Components
import OrderItem from '../OrderItem/OrderItem';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

const OrderList = ({orderList}) => {
  return (
    <FlatList
      data={orderList}
      keyExtractor={itemData => itemData._id}
      style={styles.listContainer}
      renderItem={itemData => (
        <OrderItem
          id={itemData.item._id}
          paidAt={itemData.item.paidAt}
          totalPrice={itemData.item.totalPrice}
        />
      )}
    />
  );
};

const styles = EStyleSheet.create({
  listContainer: {
    height: hp('70%'),
    backgroundColor: colors.white,
  },
});

export default OrderList;
