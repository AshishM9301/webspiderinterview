/* eslint-disable prettier/prettier */
import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ActivityIndicator, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import {getVersion} from 'react-native-device-info';
import RNSI from 'react-native-sensitive-info';

import {API_KEY, API_URL} from '../../config';
import {AppContext} from '../../App';
import {useNavigation} from '@react-navigation/native';
import Loading from '../components/Loading';

const Login = () => {
  const {logIn} = useContext(AppContext);

  const navigation = useNavigation();

  const [user, setUser] = useState<User>({email: '', password: ''});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  interface User {
    email: String;
    password: String;
  }

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (!user.email || !user.password) {
        Alert.alert('Error', 'Enter All Details');
      }

      let body = {
        email: user.email.replace(/\s/g, '').toString(),
        password: Number(user.password),
      };

      await fetch(API_URL + '/user-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: API_KEY,
        },
        body: JSON.stringify(body),
      })
        .then(r => r.json())
        .then(async res => {
          if (res?.status === 0) {
            console.log(res);
            await RNSI.setItem('user', JSON.stringify(res.data), {
              sharedPreferencesName: 'mySharedPrefs',
              keychainService: 'myKeychain',
            }).then(sr => {
              logIn(res?.data);
              Alert.alert('Success', 'Logged In', [
                {
                  text: 'Ok',
                  onPress: () => {
                    navigation.navigate('Root');
                  },
                },
              ]);
            });
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1, flexGrow: 1}}>
      <ImageBackground
        source={require('../assets/images/bg2.png')}
        style={{flex: 1}}>
        <View style={{marginTop: 30}}>
          <Image
            style={{width: '100%', height: 40, resizeMode: 'contain'}}
            source={require('../assets/images/company_logo.png')}
          />
        </View>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 30, color: '#000', fontWeight: 500}}>
            Sign In
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            backgroundColor: '#fff',
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            paddingHorizontal: 30,
            paddingVertical: 40,
          }}>
          <View style={{rowGap: 8}}>
            <Text style={{color: '#000', fontSize: 13, fontWeight: 400}}>
              Username
            </Text>
            <TextInput
              mode="outlined"
              value={user.email}
              placeholder="Username"
              onChangeText={text => setUser({...user, email: text})}
              activeOutlineColor="#888"
              outlineColor="#efefef"
              left={
                <TextInput.Icon
                  icon={() => <Icon name="user" size={20} color={'#000'} />}
                />
              }
            />
          </View>
          <View style={{rowGap: 8, marginTop: 20}}>
            <Text style={{color: '#000', fontSize: 13, fontWeight: 400}}>
              Password
            </Text>

            <TextInput
              mode="outlined"
              value={user.password}
              placeholder="******"
              onChangeText={text => setUser({...user, password: text})}
              activeOutlineColor="#888"
              secureTextEntry={!showPassword}
              outlineColor="#efefef"
              keyboardType="number-pad"
              left={
                <TextInput.Icon
                  icon={() => <Icon name="lock" size={20} color={'#000'} />}
                />
              }
              right={
                !showPassword ? (
                  <TextInput.Icon
                    icon={'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={() => setShowPassword(!showPassword)}
                    icon={() => (
                      <Icon name="eye-off" size={20} color={'#000'} />
                    )}
                  />
                )
              }
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginVertical: 10,
            }}>
            <TouchableOpacity>
              <Text style={{color: '#888', fontSize: 12, fontWeight: 500}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginVertical: 20,
            }}>
            <TouchableOpacity
              onPress={() => handleLogin()}
              style={{
                flex: 1,
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#004bd7',
                borderRadius: 20,
              }}>
              <Text style={{fontSize: 22, fontWeight: 500, color: '#fff'}}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={{textAlign: 'center'}}>Version {getVersion()}</Text>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({});
