import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageSourcePropType,
} from 'react-native';
import {FONTS_FAMILIES, IMAGES, SIZES} from '../constants/theme';
import {Theme} from '../constants/types/theme';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

type TEvent = {
  id: number;
  icon: string;
};

const NewestEvent: React.FC = () => {
  const {t} = useTranslation();
  const theme = useTheme() as Theme;
  const styles = createStyles(theme);
  const event: TEvent[] = [
    {
      id: 1,
      icon: IMAGES.event1,
    },
    {
      id: 2,
      icon: IMAGES.event2,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('newestEvent')}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.items}>
        {event.map(item => (
          <Image
            key={item.id}
            source={item.icon as ImageSourcePropType}
            resizeMode="cover"
            style={styles.image}
          />
        ))}
      </ScrollView>
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
    items: {
      flexGrow: 1,
      padding: 8,
    },
    image: {
      width: 164,
      height: 241,
      marginRight: 20,
    },
  });

export default NewestEvent;
