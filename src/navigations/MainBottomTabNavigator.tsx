/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useRef} from 'react';
import {Animated, Image, Keyboard, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SIZES, FONTS_FAMILIES, ICONS, IMAGES} from '../constants/theme';
import {MainBottomTabNavigatorParamList} from './navigation';
import {Theme} from '../constants/types/theme';
import {ActionSheetRef} from 'react-native-actions-sheet';

import {NightlifeScreen} from '../features/nightlife';
import {EventScreen} from '../features/event';
import {FriendsScreen} from '../features/friends';
import {ProfileScreen} from '../features/profile';
import {ScanTableModal} from '../features/order';

const Tab = createBottomTabNavigator<MainBottomTabNavigatorParamList>();

const MainBottomTabNavigator = () => {
  const theme = useTheme() as Theme;
  const {t} = useTranslation();
  const translateY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const baseTabBarHeight = 50;
  const bottomTabBarHeight = baseTabBarHeight + insets.bottom;
  const actionSheetRef = useRef<ActionSheetRef>(null);

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(translateY, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, [translateY]);

  return (
    <>
      <Animated.View style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: true,
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: theme.colors.tabBarIcon,
            tabBarLabelStyle: {
              fontSize: SIZES.fontXs,
              fontFamily: FONTS_FAMILIES.interMedium,
            },
            tabBarStyle: {
              paddingBottom: 5,
              position: 'absolute',
              height: bottomTabBarHeight,
              bottom: 0,
              left: 0,
              right: 0,
              transform: [
                {
                  translateY: translateY.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, bottomTabBarHeight],
                  }),
                },
              ],
            },
          }}>
          <Tab.Screen
            name="NightlifeTab"
            component={NightlifeScreen}
            options={{
              tabBarLabel: 'Nightlife',
              headerShown: true,
              headerShadowVisible: false,
              headerTitleAlign: 'center',
              headerTitle: () => (
                <Image
                  source={IMAGES.logo}
                  resizeMode="contain"
                  style={{width: 108}}
                />
              ),
              tabBarIcon: ({color, size}) => (
                <SvgXml
                  xml={ICONS.icnNightlife(color)}
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="EventTab"
            component={EventScreen}
            options={{
              tabBarLabel: 'Event',
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <SvgXml
                  xml={ICONS.icnEvent(color)}
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="FriendsTab"
            component={FriendsScreen}
            options={{
              tabBarLabel: 'Friends',
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <SvgXml
                  xml={ICONS.icnFriends(color)}
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="ProfileTab"
            component={ProfileScreen}
            options={{
              headerTitle: t('profile'),
              headerStyle: {
                backgroundColor: theme.colors.card,
              },
              tabBarLabel: t('profile'),
              tabBarIcon: ({color, size}) => (
                <SvgXml
                  xml={ICONS.icnProfile(color)}
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
          />
          <Tab.Screen
            name="OrderTab"
            component={View}
            options={{
              tabBarLabel: 'Order',
              headerShown: false,
              tabBarIcon: ({color, size}) => (
                <SvgXml
                  xml={ICONS.icnOrder(color)}
                  color={color}
                  width={size}
                  height={size}
                />
              ),
            }}
            listeners={() => ({
              tabPress: e => {
                e.preventDefault();
                actionSheetRef.current?.show();
              },
            })}
          />
        </Tab.Navigator>
      </Animated.View>
      <ScanTableModal actionSheetRef={actionSheetRef} />
    </>
  );
};

export default MainBottomTabNavigator;
