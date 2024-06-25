/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../constants/theme';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../../../constants/types/theme';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import {DrinkByCategory} from '../../../api/types/Drinks';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {SvgXml} from 'react-native-svg';
import {AppDispatch} from '../../../store/store';
import {useDispatch} from 'react-redux';
import {addOrder} from '../../../store/orderSlice';

interface IProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
  item: DrinkByCategory;
}

const AddToCardModal: React.FC<IProps> = ({actionSheetRef, item}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState<number>(0);
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const [sugarComposition, setSugarComposition] = useState<{
    composition: number;
    charges: number;
  }>({
    composition: 0,
    charges: 0,
  });
  const [iceComposition, setIceComposition] = useState<{
    composition: number;
    charges: number;
  }>({
    composition: 0,
    charges: 0,
  });

  const sugars = [
    {
      composition: 50,
      charges: 0,
    },
    {
      composition: 100,
      charges: 0,
    },
    {
      composition: 150,
      charges: 0,
    },
  ];

  const ices = [
    {
      composition: 50,
      charges: 0,
    },
    {
      composition: 100,
      charges: 0,
    },
    {
      composition: 150,
      charges: 50,
    },
  ];

  const setDefault = () => {
    setIceComposition({
      composition: 0,
      charges: 0,
    });
    setSugarComposition({
      composition: 0,
      charges: 0,
    });
  };

  const addToCartHandler = () => {
    dispatch(
      addOrder({
        idDrink: item.idDrink,
        price: item.price || 0,
        strDrink: item.strDrink,
        strDrinkThumb: item.strDrinkThumb,
        ice: iceComposition,
        sugar: sugarComposition,
        quantity,
      }),
    );
    actionSheetRef.current?.hide();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      containerStyle={styles.container}
      onBeforeClose={setDefault}>
      <View style={styles.divider} />
      <Text style={styles.title}>{item.strDrink}</Text>
      <View style={styles.card}>
        <Text style={styles.additionalTitle}>{t('addToCart.sugar')}</Text>
        {sugars.map((sugar, index) => (
          <BouncyCheckbox
            key={index}
            isChecked={sugar.composition === sugarComposition.composition}
            size={25}
            fillColor={theme.colors.primary}
            unFillColor={theme.colors.background}
            textStyle={styles.checkboxText}
            style={{marginBottom: 10}}
            textComponent={
              <View style={styles.checkboxItemContainer}>
                <Text style={styles.checkboxItemText}>
                  {sugar.composition}%
                </Text>
                <Text style={styles.checkboxItemText}>
                  {sugar.charges ? sugar.charges : t('addToCart.free')}
                </Text>
              </View>
            }
            onPress={() => {
              if (sugarComposition.composition === sugar.composition) {
                setSugarComposition({
                  composition: 0,
                  charges: 0,
                });
              } else {
                setSugarComposition(sugar);
              }
            }}
          />
        ))}
        <Text style={styles.additionalTitle}>{t('addToCart.ice')}</Text>
        {ices.map((ice, index) => (
          <BouncyCheckbox
            key={index}
            isChecked={ice.composition === iceComposition.composition}
            size={25}
            fillColor={theme.colors.primary}
            unFillColor={theme.colors.background}
            textStyle={styles.checkboxText}
            style={{marginBottom: 10}}
            textComponent={
              <View style={styles.checkboxItemContainer}>
                <Text style={styles.checkboxItemText}>{ice.composition}%</Text>
                <Text style={styles.checkboxItemText}>
                  {ice.charges ? `+${ice.charges} NTD` : t('addToCart.free')}
                </Text>
              </View>
            }
            onPress={() => {
              if (iceComposition.composition === ice.composition) {
                setIceComposition({
                  composition: 0,
                  charges: 0,
                });
              } else {
                setIceComposition(ice);
              }
            }}
          />
        ))}
        <View style={styles.addQuantityContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={!quantity}
            onPress={() => setQuantity(quantity - 1)}>
            <SvgXml
              xml={ICONS.icnMinus(theme.colors.text)}
              width={22}
              height={22}
            />
          </TouchableOpacity>
          <Text style={styles.title}>{quantity}</Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setQuantity(quantity + 1)}>
            <SvgXml
              xml={ICONS.icnPlus(theme.colors.text)}
              width={22}
              height={22}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.title}>Total</Text>
        <Text style={styles.title}>
          {(item.price || 0) * quantity +
            sugarComposition.charges +
            iceComposition.charges}{' '}
          NTD
        </Text>
      </View>
      <TouchableOpacity
        onPress={addToCartHandler}
        disabled={!quantity}
        activeOpacity={0.8}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[theme.colors.linearStart, theme.colors.linearEnd]}
          style={styles.btnContainer}>
          <Text style={styles.btnTitle}>{t('addToCart.action')}</Text>
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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    backBtn: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontFamily: FONTS_FAMILIES.interBold,
      color: theme.colors.text,
      fontSize: SIZES.fontLg,
      marginHorizontal: 16,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 16,
      margin: 16,
    },
    additionalTitle: {
      fontFamily: FONTS_FAMILIES.interMedium,
      color: theme.colors.text,
      fontSize: SIZES.font,
      marginBottom: 12,
    },
    checkboxText: {
      fontFamily: FONTS_FAMILIES.interMedium,
      color: theme.colors.text,
      textDecorationLine: 'none',
    },
    checkboxItemContainer: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      marginLeft: 10,
    },
    checkboxItemText: {
      fontFamily: FONTS_FAMILIES.interMedium,
      color: theme.colors.text,
      fontSize: SIZES.font,
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
    },
    totalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
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
  });

export default AddToCardModal;
