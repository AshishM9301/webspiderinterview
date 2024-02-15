/* eslint-disable prettier/prettier */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import CheckOutIcon from '../assets/images/icon-check-out.svg';
import CheckInIcon from '../assets/images/icon-check-in.svg';
import dayjs from 'dayjs';
import {API_KEY, API_URL} from '../../config';
import {AppContext} from '../../App';
import Loading from '../components/Loading';

const Dashboard = () => {
  const {user} = useContext(AppContext);

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMeeting = async () => {
    setLoading(true);
    let body = {user_id: user?.id};

    try {
      await fetch(API_URL + '/get-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: API_KEY,
        },
        body: JSON.stringify(body),
      })
        .then(r => r.json())
        .then(res => {
          if (res?.status === 0) {
            setMeetings(res?.data);
          }
        });
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    getMeeting();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#efefef'}}>
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
        <TouchableOpacity>
          <Image
            style={{width: 150, height: 200, resizeMode: 'contain'}}
            source={require('../assets/images/checkin-bg1.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={{width: 150, height: 200, resizeMode: 'contain'}}
            source={require('../assets/images/expense-bg.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingLeft: 20}}>
        <Text style={{fontSize: 24, fontWeight: 600, color: '#000'}}>
          Pending Check Out
        </Text>
      </View>
      <ScrollView
        style={{
          flexGrow: 1,
          paddingHorizontal: 32,
          marginTop: 20,
          backgroundColor: '#efefef',
        }}>
        {meetings.map((item, index) => (
          <View
            key={index.toString()}
            style={{
              flexDirection: 'row',
              borderWidth: 0.5,
              borderColor: '#fff',
              borderRadius: 10,
              shadowColor: 'rgba(0,0,0,0.8)',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 5,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              flex: 1,
              width: '100%',
              marginBottom: 14,
            }}>
            <View style={{flex: 3}}>
              <View
                style={{paddingHorizontal: 20, paddingVertical: 10, rowGap: 8}}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: '#000',
                  }}>
                  {item?.customer_name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <CheckInIcon width={20} height={20} />
                  <Text>
                    Check in :{' '}
                    {dayjs(item?.checkin_date).format('DD MMM YY hh:mm A')}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{flex: 1}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  backgroundColor: '#ffc000',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  padding: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CheckOutIcon width={40} height={40} />
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({});
