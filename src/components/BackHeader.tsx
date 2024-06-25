import React, {useCallback} from 'react';
import {TouchableOpacity, StyleSheet, BackHandler} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {ICONS} from '../constants/theme';
import {Theme} from '../constants/types/theme';
import {navigationRef} from '../navigations/navigationHelpers';
import {useFocusEffect, useTheme} from '@react-navigation/native';

const BackHeader: React.FC = () => {
  const theme = useTheme() as Theme;

  const onBackHandler = (): void => navigationRef.goBack();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        onBackHandler();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onBackHandler}
      style={styles.button}>
      <SvgXml
        xml={ICONS.icnArrowLeft(theme.colors.text)}
        width={22}
        height={22}
        style={styles.buttonIcon}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
});

export default BackHeader;
