import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Navigator from './routes/homeStack';


export default function App() {
  return (
    <Navigator />
  );
}
