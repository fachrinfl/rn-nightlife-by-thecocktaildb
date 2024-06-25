import React from 'react';
import {StatusBar} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootNavigatorParamList} from './navigation';
import {useTheme} from '@react-navigation/native';
import useNavigationScreenOptions from './useNavigationScreenOptions';
import {Theme} from '../constants/types/theme';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

import MainScreen from './MainBottomTabNavigator';
import OrderScreen from './OrderTopTabNavigator';
import {ScreenTableScreen} from '../features/order';

import {useTranslation} from 'react-i18next';

const StackNavigator: React.FC = () => {
  const theme = useTheme() as Theme;
  const screenOptions = useNavigationScreenOptions();
  const {t} = useTranslation();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScreenTable"
          component={ScreenTableScreen}
          options={{
            headerShown: true,
            title: t('scanTable.header'),
          }}
        />
        <Stack.Screen
          name="Order"
          component={OrderScreen}
          options={{
            headerShown: true,
            headerShadowVisible: false,
            title: t('order'),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackNavigator;
