import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  RefreshControl,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import {OrderRouteProp} from '../../../navigations/navigation';
import {useRoute, useTheme} from '@react-navigation/native';
import {useDrinkByCategory} from '../../../api/hooks/useDrinks';
import {Theme} from '../../../constants/types/theme';
import {OrderItem} from '../components';
import {RootState} from '../../../store/store';
import {useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {FONTS_FAMILIES, SIZES} from '../../../constants/theme';
import {calculateTotalCost} from '../../../utils/Helpers';
import ViewCartModal from '../modal/ViewCartModal';
import {ActionSheetRef} from 'react-native-actions-sheet';
import {useTranslation} from 'react-i18next';

const OrderScreen: React.FC = () => {
  const {t} = useTranslation();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const route = useRoute<OrderRouteProp>();
  const {category} = route.params;
  const {data, refetch, isLoading} = useDrinkByCategory({category: category});
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const orders = useSelector((state: RootState) => state.orders.orders);

  return (
    <View style={styles.container}>
      <FlatList
        data={data?.drinks || []}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.containerMenu}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[theme.colors.primary]}
          />
        }
        renderItem={({item}) => <OrderItem item={item} />}
      />
      <TouchableOpacity
        onPress={() => actionSheetRef.current?.show()}
        disabled={!orders.length}
        activeOpacity={0.8}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[theme.colors.linearStart, theme.colors.linearEnd]}
          style={styles.btnContainer}>
          <Text style={styles.btnTitle}>
            {t('addToCart.actionViewCart')}{' '}
            {orders.length ? `- ${calculateTotalCost(orders)} NTD` : ''}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      <ViewCartModal actionSheetRef={actionSheetRef} />
    </View>
  );
};

const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    containerMenu: {
      flexGrow: 1,
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

export default OrderScreen;
