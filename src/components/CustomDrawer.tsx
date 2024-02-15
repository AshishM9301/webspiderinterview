/* eslint-disable prettier/prettier */
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import RNSI from 'react-native-sensitive-info';
import React, {useContext, useState} from 'react';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Rndi from 'react-native-device-info';

import User from '../assets/images/icon-user.svg';
import Mail from '../assets/images/Icon-mail.svg';
import Call from '../assets/images/Icon-call.svg';
import Setting from '../assets/images/settings.svg';
import CheckIns from '../assets/images/check-ins.svg';
import MyExpenses from '../assets/images/my-expenses.svg';
import Logout from '../assets/images/logout.svg';
import Icon from '../assets/images/app-icon.svg';
import {Link, useNavigation} from '@react-navigation/native';
import {AppContext} from '../../App';
import Loading from './Loading';

const CustomDrawer = (props: any) => {
  const width = useWindowDimensions().width * 0.3;

  const navigation = useNavigation();

  const {user, logOut} = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const menus = [
    {link: 'Setting', name: 'Setting', image: Setting},
    {link: 'Setting', name: 'Check-Ins', image: CheckIns},
    {link: 'Setting', name: 'My Expenses', image: MyExpenses},
  ];

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await RNSI.deleteItem('user', {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      }).then(() => {
        logOut();
        navigation.navigate('Login');
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
    <DrawerContentScrollView {...props}>
      <View style={styles.menuContainer}>
        <View style={styles.menuUserContainer}>
          <ImageBackground
            source={require('../assets/images/menu_bg_top.png')}
            style={{
              flex: 1,
              borderRadius: 10,
              justifyContent: 'center',
              paddingLeft: 30,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                columnGap: 10,
              }}>
              <View
                style={{
                  backgroundColor: '#156aef',
                  borderRadius: 99999,
                  padding: 6,
                }}>
                <User
                  width={70}
                  height={70}
                  style={{backgroundColor: '#efefef', borderRadius: 99999}}
                />
              </View>
              <View>
                <Text style={{fontSize: 16, fontWeight: 500, color: '#fff'}}>
                  {user?.first_name + ' ' + user?.last_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Mail width={24} height={24} />
                  <Text style={{fontSize: 12, fontWeight: 300, color: '#fff'}}>
                    {user?.email}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Call width={24} height={24} />
                  <Text style={{fontSize: 12, fontWeight: 300, color: '#fff'}}>
                    {user?.phone}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-between',
            backgroundColor: '#efefef',
          }}>
          <View style={{flex: 1, paddingTop: 40}}>
            {menus.map((item, index) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(item.link)}
                key={index.toString()}>
                <View
                  style={{
                    flexDirection: 'row',

                    // backgroundColor: 'red',
                    paddingLeft: 32,

                    paddingVertical: 15,
                    alignItems: 'center',
                    columnGap: 20,
                  }}>
                  <View
                    style={{
                      borderRadius: 8,
                      shadowColor: 'rgba(0,0,0,0.6)',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      backgroundColor: '#fff',
                    }}>
                    <item.image width={30} height={30} />
                  </View>
                  <Text style={{fontSize: 18, fontWeight: 500, color: '#000'}}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{paddingLeft: 32, paddingVertical: 15}}>
              <TouchableOpacity
                onPress={() => {
                  handleLogOut();
                }}
                style={{
                  flexDirection: 'row',
                  flex: 1,

                  alignItems: 'center',
                  columnGap: 10,
                }}>
                <View>
                  <Logout width={20} height={20} />
                </View>
                <Text style={{fontSize: 18, fontWeight: 500, color: '#000'}}>
                  Logout
                </Text>
              </TouchableOpacity>
              <Text style={{paddingLeft: 30, fontSize: 12}}>
                Version {Rndi.getVersion()}
              </Text>
            </View>
            <View>
              <Icon width={80} height={80} />
            </View>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: Dimensions.get('window').height - 30,
  },
  menuUserContainer: {
    width: '100%',
    height: 200,
    marginTop: -5,
    borderRadius: 12,
  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
});
