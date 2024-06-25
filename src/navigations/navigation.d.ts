import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

export type RootNavigatorParamList = {
  Main: NavigatorScreenParams<MainBottomTabNavigatorParamList> | undefined;
  ScreenTable: undefined;
  Order: {category: string};
};

export type MainBottomTabNavigatorParamList = {
  NightlifeTab: undefined;
  EventTab: undefined;
  FriendsTab: undefined;
  ProfileTab: undefined;
  OrderTab: undefined;
};

export type ScanTableNavigationProp = NativeStackNavigationProp<
  RootNavigatorParamList,
  'Order'
>;

export type OrderRouteProp = RouteProp<RootNavigatorParamList, 'Order'>;
