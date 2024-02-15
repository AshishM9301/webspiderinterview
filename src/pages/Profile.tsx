/* eslint-disable prettier/prettier */
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {AppContext} from '../../App';

const Profile = () => {
  const {user: userData} = useContext(AppContext);

  const [user, setUser] = useState(userData);

  return (
    <SafeAreaView>
      <View>
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
              // onChangeText={text => setUser({...user, email: text})}
              activeOutlineColor="#888"
              outlineColor="#efefef"
              disabled
              left={
                <TextInput.Icon
                  icon={() => <Icon name="user" size={20} color={'#000'} />}
                />
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({});
