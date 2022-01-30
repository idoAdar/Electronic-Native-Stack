import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../../../redux/actions/userActions';

// Components
import ButtonElement from '../../Reusable/ButtonElement/ButtonElement';
import TextElement from '../../Reusable/TextElement/TextElement';

// Style
import {colors} from '../../../assets/colors/colors';
import EStyleSheet from 'react-native-extended-stylesheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const AmountModal = ({id, name, amount, price, navigate}) => {
  const [loader, setLoader] = useState(false);
  const [amountState, setAmountState] = useState(1);
  const [totalAmount, setTotalAmount] = useState(price);
  const dispatch = useDispatch();
  const maxLength = amount;

  useEffect(() => {
    setTotalAmount(price * amountState);
  }, [amountState]);

  const onAdd = async () => {
    setLoader(true);
    await dispatch(addToCart(id, amountState, totalAmount));
    navigate();
  };

  const onPluse = () => {
    if (amountState !== maxLength) {
      setAmountState(prevState => +prevState + 1);
    }
  };

  const onMinus = () => {
    if (amountState !== 1) {
      setAmountState(prevState => +prevState - 1);
    }
  };

  return (
    <View style={styles.amountModal}>
      <TextElement customStyle={styles.nameText}>
        * Purchase {name} *
      </TextElement>
      <View style={styles.buttonsContainer}>
        <ButtonElement
          title={'+'}
          bgColor={colors.light}
          onPress={onPluse}
          customStyle={styles.button}
        />
        <TextElement customStyle={styles.amountText}>{amountState}</TextElement>
        <ButtonElement
          title={'-'}
          bgColor={colors.light}
          onPress={onMinus}
          customStyle={styles.button}
        />
      </View>
      <TextElement>
        Total Amount:{' '}
        <TextElement customStyle={styles.cyanFont}>
          {totalAmount.toFixed(2)}$
        </TextElement>
      </TextElement>
      <ButtonElement
        title={'Add'}
        bgColor={colors.cyan}
        titleColor={colors.white}
        setSpinner={loader}
        onPress={onAdd}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  amountModal: {
    height: hp('25%'),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
  },
  buttonsContainer: {
    width: wp('60%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: '0.8rem',
  },
  amountText: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  smallFont: {
    fontSize: '0.8rem',
  },
  cyanFont: {
    color: colors.cyan,
  },
  button: {
    width: '5rem',
    height: '3rem',
  },
});

export default AmountModal;
