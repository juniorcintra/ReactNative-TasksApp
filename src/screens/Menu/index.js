import React from 'react';
import {
  Platform,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DrawerItems} from 'react-navigation-drawer';
import {Gravatar} from 'react-native-gravatar';
import commonStyles from '../../commonStyles';

import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

const Menu = props => {
  const logout = () => {
    delete axios.defaults.headers.common['Authorization'];
    AsyncStorage.removeItem('userData');
    props.navigation.navigate('AuthOrApp');
  };

  const optionsGravatar = {
    email: props.navigation.getParam('email'),
    secure: true,
  };
  return (
    <ScrollView>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <Gravatar style={styles.avatar} options={optionsGravatar} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{props.navigation.getParam('name')}</Text>
          <Text style={styles.email}>{props.navigation.getParam('email')}</Text>
        </View>
        <TouchableOpacity onPress={() => logout()}>
          <View style={styles.logoutIcon}>
            <Icon name="sign-out" size={30} color="#800" />
          </View>
        </TouchableOpacity>
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    color: '#000',
    fontFamily: commonStyles.fontFamily,
    fontSize: 30,
    padding: 10,
    paddingTop: Platform.OS === 'ios' ? 70 : 30,
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderRadius: 30,
    margin: 10,
    backgroundColor: '#222',
  },
  userInfo: {
    marginLeft: 10,
  },
  name: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 20,
    marginBottom: 5,
    color: commonStyles.colors.mainText,
  },
  email: {
    fontFamily: commonStyles.fontFamily,
    fontSize: 15,
    marginBottom: 10,
    color: commonStyles.colors.subText,
  },
  logoutIcon: {
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default Menu;
