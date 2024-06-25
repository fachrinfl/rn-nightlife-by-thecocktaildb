import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Image} from 'react-native';
import {SearchBar, FindBestPlace, NewestEvent} from '../../../components';
import {IMAGES, SIZES} from '../../../constants/theme';
import {useTranslation} from 'react-i18next';

const NightlifeScreen: React.FC = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar placeholder={t('searchParty')} onChangeText={() => {}} />
      <ScrollView
        contentContainerStyle={styles.scrollViewcontainer}
        showsVerticalScrollIndicator={false}>
        <Image
          source={IMAGES.poster}
          resizeMode="stretch"
          style={styles.image}
        />
        <FindBestPlace />
        <NewestEvent />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewcontainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  image: {
    height: 400,
    width: SIZES.width,
  },
});

export default NightlifeScreen;
