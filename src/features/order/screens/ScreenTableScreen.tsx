import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const ScreenTableScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Screen Table Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenTableScreen;
