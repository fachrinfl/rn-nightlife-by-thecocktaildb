import React from 'react';
import {useTheme} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {FONTS_FAMILIES} from '../constants/theme';
import {Theme} from '../constants/types/theme';
import {BackHeader} from '../components';

const useNavigationScreenOptions = (): NativeStackNavigationOptions => {
  const theme = useTheme() as Theme;
  return {
    headerShown: true,
    gestureEnabled: false,
    headerTitleStyle: {
      fontFamily: FONTS_FAMILIES.interBold,
      color: theme.colors.text,
    },
    headerLeft: () => <BackHeader />,
  };
};

export default useNavigationScreenOptions;
