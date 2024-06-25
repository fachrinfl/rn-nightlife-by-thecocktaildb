import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {FONTS_FAMILIES, ICONS, SIZES} from '../../../constants/theme';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Theme} from '../../../constants/types/theme';
import {SvgXml} from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import {ScanTableNavigationProp} from '../../../navigations/navigation';
import {useTranslation} from 'react-i18next';

interface IProps {
  actionSheetRef: React.RefObject<ActionSheetRef>;
}

const ScanTableModal: React.FC<IProps> = ({actionSheetRef}) => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const navigation = useNavigation<ScanTableNavigationProp>();

  return (
    <ActionSheet ref={actionSheetRef} containerStyle={styles.container}>
      <View style={styles.divider} />
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => actionSheetRef.current?.hide()}
          style={styles.backBtn}>
          <SvgXml
            xml={ICONS.icnArrowLeft(theme.colors.text)}
            width={18}
            height={18}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{t('scanTable.title')}</Text>
      </View>
      <Text style={styles.info}>{t('scanTable.instuction')}</Text>
      <TouchableOpacity
        onPress={() => {
          actionSheetRef.current?.hide();
          navigation.navigate('Order');
        }}
        activeOpacity={0.8}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[theme.colors.linearStart, theme.colors.linearEnd]}
          style={styles.btnContainer}>
          <Text style={styles.btnTitle}>{t('scanTable.action')}</Text>
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
      padding: 20,
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
      color: theme.colors.secondary,
      fontSize: SIZES.fontLg,
      textAlign: 'center',
      width: '100%',
      paddingRight: 33,
    },
    info: {
      fontFamily: FONTS_FAMILIES.interMedium,
      color: theme.colors.text,
      fontSize: SIZES.fontXs,
      textAlign: 'center',
      marginTop: 25,
      marginBottom: 15,
    },
    btnContainer: {
      borderRadius: 8,
      paddingVertical: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 25,
    },
    btnTitle: {
      color: theme.colors.text,
      fontFamily: FONTS_FAMILIES.interSemiBold,
      fontSize: SIZES.fontLg,
    },
  });

export default ScanTableModal;
