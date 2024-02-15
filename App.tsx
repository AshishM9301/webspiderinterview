/* eslint-disable react/no-unstable-nested-components */
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNSI from 'react-native-sensitive-info';

import Dashboard from './src/pages/Dashboard';
import CustomDrawer from './src/components/CustomDrawer';
import Profile from './src/pages/Profile';
import MenuIcon from './src/assets/images/icon-menu.svg';
import Settings from './src/pages/Settings';
import Login from './src/pages/Login';
import Loading from './src/components/Loading';

export const AppContext = React.createContext(null);

const App = () => {
  const Drawer = createDrawerNavigator();

  const Stack = createNativeStackNavigator();

  const AppIntialState = {
    user: {},
    isLoggedIn: false,
  };

  const [appState, setAppState] = useState(AppIntialState);
  const [loading, setLoading] = useState(false);

  const logIn = (data: any) => {
    console.log(data);
    setAppState({...appState, user: data, isLoggedIn: true});
  };

  const logOut = () => {
    setAppState({...appState, user: {}, isLoggedIn: false});
  };

  const AppMainContextSetter = {
    logIn,
    logOut,
  };

  const getUser = async () => {
    setLoading(true);
    try {
      let data = await RNSI.getItem('user', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });
      if (data) {
        const user = JSON.parse(data);

        setAppState({...appState, user: user, isLoggedIn: true});
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const Root = () => {
    return (
      <Drawer.Navigator
        screenOptions={({navigation}) => ({
          header: props => (
            <View
              {...props}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 10,
                backgroundColor: '#fff',
              }}>
              <TouchableOpacity
                style={{marginLeft: 10}}
                onPress={navigation.toggleDrawer}>
                <MenuIcon width={30} height={30} />
              </TouchableOpacity>
              <View style={{flex: 1}}>
                <Image
                  style={{width: '100%', height: 40, resizeMode: 'contain'}}
                  source={require('./src/assets/images/company_logo.png')}
                />
              </View>
            </View>
          ),
        })}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="Dashboard" component={Dashboard} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <AppContext.Provider value={{...appState, ...AppMainContextSetter}}>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={appState.isLoggedIn ? Root : Login}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="Root"
            component={appState.isLoggedIn ? Root : Login}
          />
          <Stack.Screen
            name="Setting"
            component={appState.isLoggedIn ? Settings : Login}
          />
        </Stack.Navigator>
      </AppContext.Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
