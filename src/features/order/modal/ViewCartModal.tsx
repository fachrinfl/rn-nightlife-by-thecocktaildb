import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../constants/types/theme';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../store/store';
import {calculateTotalCost} from '../../../utils/Helpers';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import {updateOrderQuantity, deleteOrder} from '../../../store/orderSlice';

interface IProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
}

const ViewCartModal: React.FC<IProps> = ({actionSheetRef}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <ActionSheet ref={actionSheetRef} containerStyle={styles.container}>
      <View style={styles.divider} />
      <Text style={styles.title}>Cart</Text>
      <View style={styles.totalContainer}>
        <Text
          style={[
            styles.title,
            {fontFamily: FONTS_FAMILIES.interMedium, color: theme.colors.text},
          ]}>
          Total
        </Text>
        <Text style={styles.title}>{`${calculateTotalCost(orders)} NTD`}</Text>
      </View>
      <View style={styles.contentMenu}>
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          renderItem={({item}) => (
            <View style={styles.itemCart}>
              <View style={styles.itemHeader}>
                <FastImage
                  style={styles.itemImage}
                  source={{
                    uri: item.strDrinkThumb,
                    priority: FastImage.priority.normal,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <View style={styles.itemInfoContainer}>
                  <Text style={styles.itemTitle}>
                    {item.strDrink} x {item.quantity}
                  </Text>
                  <Text style={styles.itemPrice}>
                    {item.quantity * item.price}
                  </Text>
                </View>
              </View>
              <View style={styles.itemFooter}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => dispatch(deleteOrder(item.idDrink))}>
                  <SvgXml
                    xml={ICONS.icnDelete(theme.colors.text)}
                    width={22}
                    height={22}
                  />
                </TouchableOpacity>
                <View style={styles.addQuantityContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      dispatch(
                        updateOrderQuantity({
                          id: item.idDrink,
                          quantity: item.quantity - 1,
                        }),
                      )
                    }>
                    <SvgXml
                      xml={ICONS.icnMinus(theme.colors.text)}
                      width={22}
                      height={22}
                    />
                  </TouchableOpacity>
                  <Text style={styles.title}>{item.quantity}</Text>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      dispatch(
                        updateOrderQuantity({
                          id: item.idDrink,
                          quantity: item.quantity + 1,
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
              </View>
            </View>
          )}
        />
      </View>
      <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[theme.colors.linearStart, theme.colors.linearEnd]}
          style={styles.btnContainer}>
          <Text style={styles.btnTitle}>{t('checkout')}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ActionSheet>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 20,
    },
    divider: {
      width: 114,
      height: 8,
      alignSelf: 'center',
      borderRadius: 8 / 2,
      marginBottom: 20,
      backgroundColor: theme.colors.border,
    },
    title: {
      fontFamily: FONTS_FAMILIES.interBold,
      color: theme.colors.primary,
      fontSize: SIZES.fontLg,
      marginHorizontal: 16,
      textAlign: 'center',
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
      marginTop: 12,
    },
    btnContainer: {
      paddingVertical: 12,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnTitle: {
      color: theme.colors.text,
      fontFamily: FONTS_FAMILIES.interSemiBold,
      fontSize: SIZES.fontLg,
    },
    contentMenu: {
      maxHeight: 500,
    },
    contentList: {
      flexGrow: 1,
    },
    itemCart: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 16,
      marginHorizontal: 16,
      marginBottom: 16,
    },
    itemHeader: {
      flexDirection: 'row',
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 12,
    },
    itemImage: {
      height: 100,
      width: 100,
      backgroundColor: theme.colors.border,
      borderRadius: 8,
    },
    itemInfoContainer: {
      marginLeft: 16,
    },
    itemTitle: {
      fontFamily: FONTS_FAMILIES.interSemiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.text,
    },
    itemPrice: {
      fontFamily: FONTS_FAMILIES.interSemiBold,
      fontSize: SIZES.fontLg,
      color: theme.colors.primary,
      marginTop: 6,
    },
    itemFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    addQuantityContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      borderRadius: 4,
      paddingVertical: 8,
      height: 40,
      borderWidth: 1,
      borderColor: theme.colors.border,
      width: 110,
    },
  });

export default ViewCartModal;
