import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [name, setName] = useState('Ben');
  const [age, setAge] = useState('30');

  return (
    <View>
      <Text>Hello, World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
