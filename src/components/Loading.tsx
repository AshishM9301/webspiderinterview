/* eslint-disable prettier/prettier */
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Loading = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#efefef',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator animating={true} color="#000" size={48} />
    </SafeAreaView>
  );
};

export default Loading;

const styles = StyleSheet.create({});
