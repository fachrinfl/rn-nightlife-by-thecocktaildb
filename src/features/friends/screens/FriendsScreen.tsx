import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const FriendsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Friends Screen</Text>
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

export default FriendsScreen;
