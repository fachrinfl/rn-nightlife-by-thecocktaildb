import {useTheme} from '@react-navigation/native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Theme} from '../../../constants/types/theme';
import {FONTS_FAMILIES, ICONS, IMAGES, SIZES} from '../../../constants/theme';
import {SvgXml} from 'react-native-svg';
import {LanguageSwitch, ThemeSwitch} from '../../../components';

const ProfileScreen: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <Image
            source={IMAGES.userAvatar}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.itemContainer}>
          <SvgXml
            xml={ICONS.icnLanguage(theme.colors.primary)}
            width={24}
            height={24}
          />
          <Text style={styles.itemTitle}>{t('changeLanguage')}</Text>
          <LanguageSwitch />
        </View>
        <View style={styles.itemContainer}>
          <SvgXml
            xml={ICONS.icnLightMode(theme.colors.primary)}
            width={24}
            height={24}
          />
          <Text style={styles.itemTitle}>{t('mode')}</Text>
          <ThemeSwitch />
        </View>
      </View>
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 80,
      backgroundColor: theme.colors.card,
    },
    contentContainer: {
      backgroundColor: theme.colors.background,
      flex: 1,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      padding: 20,
    },
    avatarContainer: {
      width: 93,
      height: 93,
      borderRadius: 93 / 2,
      marginTop: -(130 / 2),
      alignSelf: 'center',
      backgroundColor: theme.colors.border,
      marginBottom: 30,
    },
    image: {
      width: 93,
      height: 93,
      borderRadius: 93 / 2,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
      padding: 15,
      borderRadius: 12,
      borderWidth: 1,
      justifyContent: 'space-between',
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.primary,
    },
    itemTitle: {
      flex: 1,
      paddingHorizontal: 20,
      color: theme.colors.headerText,
      fontFamily: FONTS_FAMILIES.interMedium,
      fontSize: SIZES.font,
    },
  });

export default ProfileScreen;
