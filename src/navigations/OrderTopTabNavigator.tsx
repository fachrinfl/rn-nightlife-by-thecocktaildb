import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {OrderScreen} from '../features/order';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from '@react-navigation/native';
import {Theme} from '../constants/types/theme';
import {useCategoryDrinks} from '../api/hooks/useDrinks';
import {useTranslation} from 'react-i18next';
import {SearchBar} from '../components';

const Tab = createMaterialTopTabNavigator();

const OrderTopTabNavigator = () => {
  const theme = useTheme() as Theme;
  const {data, isLoading} = useCategoryDrinks();
  const {t} = useTranslation();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <>
      <SearchBar
        placeholder={t('orderBooking.searchDrink')}
        onChangeText={() => {}}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarScrollEnabled: true,
        }}>
        {data?.drinks.map((item, index) => (
          <Tab.Screen
            key={index}
            name={item.strCategory}
            component={OrderScreen}
            initialParams={{
              category: item.strCategory,
            }}
            options={{
              title: item.strCategory,
            }}
          />
        ))}
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderTopTabNavigator;
