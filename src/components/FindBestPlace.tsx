import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FONTS_FAMILIES, ICONS, SIZES} from '../constants/theme';
import {Theme} from '../constants/types/theme';
import {useTheme} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useTranslation} from 'react-i18next';

type TMenu = {
  id: number;
  icon: string;
  menu: string;
};

const FindBestPlace: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const menus: TMenu[] = [
    {
      id: 1,
      icon: ICONS.icnDiscoLight(theme.colors.tabBarIcon),
      menu: 'Nightclub',
    },
    {
      id: 2,
      icon: ICONS.icnKaraoke(theme.colors.tabBarIcon),
      menu: 'KTV',
    },
    {
      id: 3,
      icon: ICONS.icnBeer(theme.colors.tabBarIcon),
      menu: 'Pregames',
    },
    {
      id: 4,
      icon: ICONS.icnWineBottle(theme.colors.tabBarIcon),
      menu: 'Bar',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('findBestPlace')}</Text>
      <View style={styles.menuContainer}>
        {menus.map(item => (
          <View key={item.id} style={styles.card}>
            <SvgXml xml={item.icon} width={24} height={24} />
            <Text style={styles.name}>{item.menu}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      padding: 8,
    },
    title: {
      fontFamily: FONTS_FAMILIES.ralewayBold,
      color: theme.colors.primary,
      fontSize: SIZES.font,
      margin: 8,
    },
    card: {
      padding: 12,
      borderRadius: SIZES.radiusXs,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      flex: 1 / 4,
      margin: 8,
      height: 70,
    },
    menuContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    name: {
      fontSize: SIZES.fontXs,
      fontFamily: FONTS_FAMILIES.interMedium,
      color: theme.colors.text,
      marginTop: 10,
    },
  });

export default FindBestPlace;
