import React, {useRef, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Theme} from '../../../constants/types/theme';
import FastImage from 'react-native-fast-image';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../constants/theme';
import {DrinkByCategory} from '../../../api/types/Drinks';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {updateOrderQuantity} from '../../../store/orderSlice';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {AddToCardModal} from '../';
import {SvgXml} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

interface IProps {
  item: DrinkByCategory;
}

const OrderItem: React.FC<IProps> = ({item}) => {
  const {t} = useTranslation();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const checkCart = orders.find(order => order.idDrink === item.idDrink);

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{item.strDrink}</Text>
          <Text style={styles.price}>NTD {item.price}</Text>
        </View>
        <View>
          {checkCart ? (
            <View style={styles.addQuantityContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  dispatch(
                    updateOrderQuantity({
                      id: item.idDrink,
                      quantity: checkCart.quantity - 1,
                    }),
                  )
                }>
                <SvgXml
                  xml={ICONS.icnMinus(theme.colors.text)}
                  width={22}
                  height={22}
                />
              </TouchableOpacity>
              <Text style={styles.title}>{checkCart.quantity}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  dispatch(
                    updateOrderQuantity({
                      id: item.idDrink,
                      quantity: checkCart.quantity + 1,
                    }),
                  )
                }>
                <SvgXml
                  xml={ICONS.icnPlus(theme.colors.text)}
                  width={22}
                  height={22}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addToCardBtn}
              activeOpacity={0.8}
              onPress={() => actionSheetRef.current?.show()}>
              <Text style={styles.title}>{t('addToCart.action')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <FastImage
        style={styles.image}
        source={{
          uri: item.strDrinkThumb,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <AddToCardModal actionSheetRef={actionSheetRef} item={item} />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginHorizontal: 16,
      paddingVertical: 16,
      justifyContent: 'space-between',
      borderColor: theme.colors.border,
      borderBottomWidth: 1,
    },
    info: {
      flex: 0.7,
      justifyContent: 'space-between',
      flexDirection: 'column',
    },
    title: {
      fontFamily: FONTS_FAMILIES.interSemiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.text,
    },
    price: {
      fontFamily: FONTS_FAMILIES.interSemiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.primary,
    },
    image: {
      height: 120,
      width: 120,
      backgroundColor: theme.colors.border,
      borderRadius: 8,
    },
    addToCardBtn: {
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 6,
      width: 110,
      alignItems: 'center',
    },
    addToCardText: {
      fontFamily: FONTS_FAMILIES.interSemiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.text,
    },
    addQuantityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 4,
      paddingVertical: 8,
      height: 40,
      marginTop: 15,
      borderWidth: 1,
      borderColor: theme.colors.border,
      width: 110,
    },
  });

export default OrderItem;
