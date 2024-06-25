import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const EventScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Event Screen</Text>
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

export default EventScreen;
