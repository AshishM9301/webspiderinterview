/* eslint-disable prettier/prettier */
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {AppContext} from '../../App';
import Icon from 'react-native-vector-icons/Feather';

import UserIcon from '../assets/images/icon-user.svg';

const Settings = () => {
  const {user: userData} = useContext(AppContext);

  const [user, setUser] = useState(userData);
  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', paddingTop: 30}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#d9e7fd',
              padding: 10,
              position: 'relative',
              borderRadius: 9999,
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 9999,
                padding: 20,
              }}>
              <UserIcon width={120} height={120} />
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 6,
                right: 6,
                backgroundColor: '#0058ed',
                padding: 10,
                borderRadius: 9999,
              }}>
              <Icon name="camera" size={24} color={'#fff'} />
            </TouchableOpacity>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 20, fontWeight: 500, color: '#000'}}>
              {user?.first_name + ' ' + user?.last_name}
            </Text>
            <Text style={{fontSize: 14, fontWeight: 400, color: '#000'}}>
              {user?.designation}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flex: 2,
          paddingHorizontal: 32,
          paddingVertical: 0,
          rowGap: 20,
          marginTop: 20,
        }}>
        <View style={{rowGap: 8}}>
          <Text style={{color: '#000', fontSize: 13, fontWeight: 400}}>
            Username
          </Text>
          <TextInput
            mode="outlined"
            value={user.username}
            placeholder="Username"
            // onChangeText={text => setUser({...user, email: text})}
            activeOutlineColor="#888"
            outlineColor="#efefef"
            textColor="#000"
            disabled
            left={
              <TextInput.Icon
                icon={() => <Icon name="user" size={20} color={'#000'} />}
              />
            }
          />
        </View>
        <View style={{rowGap: 8}}>
          <Text style={{color: '#000', fontSize: 13, fontWeight: 400}}>
            Email
          </Text>
          <TextInput
            mode="outlined"
            value={user.email}
            placeholder="Username"
            // onChangeText={text => setUser({...user, email: text})}
            activeOutlineColor="#888"
            outlineColor="#efefef"
            textColor="#000"
            disabled
            left={
              <TextInput.Icon
                icon={() => <Icon name="mail" size={20} color={'#000'} />}
              />
            }
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            columnGap: 18,
            borderRadius: 4,
            borderWidth: 0.5,
            borderColor: '#rgba(0,0,0,0.3)',
            paddingHorizontal: 20,
            paddingVertical: 15,
            marginTop: 20,
            alignItems: 'center',
          }}>
          <Icon name="lock" size={16} color={'#000'} />
          <View style={{flex: 1}}>
            <Text style={{color: '#000', fontSize: 16, fontWeight: 400}}>
              Reset Password
            </Text>
          </View>
          <Icon name="chevron-right" size={16} color={'#000'} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
