import React from 'react';
import {FlatList} from 'react-native';

// Components
import ProductItem from '../ProductItem/ProductItem';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';

const ProductsList = ({products}) => {
  return (
    <FlatList
      data={products}
      key={itemData => itemData._id}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      style={styles.productsContainer}
      renderItem={({item}) => (
        <ProductItem
          id={item._id}
          name={item.name}
          image={item.image}
          brand={item.brand}
          price={item.price}
        />
      )}
    />
  );
};

const styles = EStyleSheet.create({
  productsContainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: colors.light,
  },
});

export default ProductsList;
